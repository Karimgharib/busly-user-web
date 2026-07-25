// app/[locale]/booking/[id]/BookingContext.jsx
"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { useSupabaseMutate } from "@/hooks/useSupabaseMutate";
import { useTenant } from "@/lib/TenantProvider";
import { useAuth } from "@/hooks/useAuth";

const BookingContext = createContext(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be inside BookingProvider");
  return ctx;
}

export function BookingProvider({ scheduleId, children }) {
  const t = useTranslations("booking");
  const locale = useLocale();
  const router = useRouter();
  const { tenant } = useTenant();
  const { user } = useAuth();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [vfCashPhone, setVfCashPhone] = useState("");
  const [pickupPointId, setPickupPointId] = useState("");
  const [error, setError] = useState("");

  // Schedule
  const { data: schedule, isLoading } = useSupabaseQuery({
    table: "schedules",
    queryKey: ["schedule-booking", scheduleId],
    select: "*, routes(*), buses(*)",
    filters: { id: scheduleId, tenant_id: tenant?.id },
    single: true,
    enabled: !!scheduleId && !!tenant?.id,
  });

  // Booked seats for this schedule (exclude cancelled bookings — those seats are free again)
  const { data: bookedSeats = [] } = useSupabaseQuery({
    table: "bookings",
    queryKey: ["booked-seats", scheduleId],
    select: "seat_number",
    filters: { schedule_id: scheduleId, "status.neq": "cancelled" },
    enabled: !!scheduleId,
  });

  // Pickup points for this route
  const { data: pickupPoints = [] } = useSupabaseQuery({
    table: "pickup_points",
    queryKey: ["pickup-points", schedule?.routes?.id],
    select: "id, name",
    filters: {
      tenant_id: tenant?.id,
      route_id: schedule?.routes?.id,
    },
    enabled: !!schedule?.routes?.id && !!tenant?.id,
  });

  const seatMap = useMemo(() => {
    if (!schedule?.buses?.total_seats) return [];
    const seats = [];
    for (let i = 1; i <= schedule.buses.total_seats; i++)
      seats.push({ number: i });
    return seats;
  }, [schedule?.buses?.total_seats]);

  const isOccupied = (num) => bookedSeats.some((b) => b.seat_number === num);

  const toggleSeat = (num) => {
    if (isOccupied(num)) return;
    setSelectedSeats((prev) =>
      prev.includes(num) ? prev.filter((s) => s !== num) : [...prev, num],
    );
    setError("");
  };

  const removeSeat = (num) => {
    setSelectedSeats((prev) => prev.filter((s) => s !== num));
    setError("");
  };

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const getDuration = () => {
    if (!schedule) return "";
    const diff =
      (new Date(schedule.arrival_time) - new Date(schedule.departure_time)) /
      (1000 * 60);
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${h}h ${m}m`;
  };

  const totalPrice = schedule ? schedule.price * selectedSeats.length : 0;

  const canSubmit =
    selectedSeats.length > 0 &&
    passengerName.trim() &&
    passengerPhone.trim() &&
    vfCashPhone.trim() &&
    pickupPointId;

  const { mutate: confirmBooking, isPending: isSubmitting } = useSupabaseMutate(
    {
      table: "bookings",
      method: "insert",
      select: "id",
      queryKeysToInvalidate: [["booked-seats", scheduleId]],
      onSuccess: (data) => {
        setError("");
        // const ids = data.map((b) => b.id).join(",");
        // router.push(`/${locale}/payment?ids=${ids}&amount=${totalPrice}`);
        router.push(`/${locale}/tickets`);
      },
    },
  );

  const handleConfirm = () => {
    if (!canSubmit || !schedule) return;
    setError("");

    const payload = selectedSeats.map((seat) => ({
      tenant_id: tenant.id,
      user_id: user?.id,
      schedule_id: scheduleId,
      seat_number: seat,
      total_price: schedule.price,
      status: "pending",
      passenger_name: passengerName.trim(),
      passenger_phone: passengerPhone.trim(),
      vf_cash_phone: vfCashPhone.trim(),
      pickup_point_id: pickupPointId,
    }));

    confirmBooking(payload, {
      onError: (err) => {
        console.error("Booking failed:", err);
        setError(err?.message || t("somethingWentWrong"));
      },
    });
  };

  const value = {
    schedule,
    isLoading,
    seatMap,
    selectedSeats,
    isOccupied,
    toggleSeat,
    removeSeat,
    passengerName,
    setPassengerName,
    passengerPhone,
    setPassengerPhone,
    vfCashPhone,
    setVfCashPhone,
    pickupPointId,
    setPickupPointId,
    pickupPoints,
    formatTime,
    getDuration,
    totalPrice,
    canSubmit,
    isSubmitting,
    error,
    handleConfirm,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
