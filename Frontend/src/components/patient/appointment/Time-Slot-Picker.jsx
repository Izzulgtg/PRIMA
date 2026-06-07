import AppointmentSlotCard from "./appointment-slot-card";

function TimeSlotPicker({
  slots = [],
  selectedSlot,
  onSelect,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

      {slots.map((slot) => (
        <AppointmentSlotCard
          key={slot.id}
          time={`${slot.jam_mulai} - ${slot.jam_selesai}`}
          status={`Kuota ${slot.kuota}`}
          selected={
            selectedSlot?.id ===
            slot.id
          }
          onClick={() =>
            onSelect(slot)
          }
        />
      ))}

    </div>
  );
}

export default TimeSlotPicker;