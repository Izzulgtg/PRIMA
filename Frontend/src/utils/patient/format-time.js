export const formatTime = (timeString) => {
  if (!timeString) return "-";

  try {
    const date = new Date(`2000-01-01 ${timeString}`);

    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return timeString;
  }
};