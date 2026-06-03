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
          key={slot.time}
          time={slot.time}
          status={slot.status}
          disabled={slot.status === "Busy"}
          selected={
            selectedSlot === slot.time
          }
          onClick={() =>
            onSelect(slot.time)
          }
        />
      ))}

    </div>
  );
}

export default TimeSlotPicker;