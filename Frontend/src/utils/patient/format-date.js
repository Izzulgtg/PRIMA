export const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};