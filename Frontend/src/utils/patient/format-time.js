export const formatTime = (timeString) => {
  if (!timeString) return "-";

  try {
    // normalisasi format jam
    const normalizedTime =
      timeString.length === 5 ? `${timeString}:00` : timeString;

    const date = new Date(`2000-01-01T${normalizedTime}`);

    if (isNaN(date.getTime())) return timeString;

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return timeString;
  }
};