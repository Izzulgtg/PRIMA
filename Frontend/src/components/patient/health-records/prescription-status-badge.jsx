function PrescriptionStatusBadge({
  status = "Selesai",
}) {
  const normalizedStatus =
    status?.toLowerCase().trim();

  const getStatusClass = () => {
    switch (normalizedStatus) {
      case "completed":
      case "selesai":
        return "bg-prima-sand text-prima-green";

      case "reviewed":
      case "ditinjau":
        return "bg-blue-100 text-prima-teal";

      case "pending":
      case "menunggu":
        return "bg-yellow-100 text-yellow-700";

      case "prescription sent":
      case "resep dikirim":
        return "bg-orange-100 text-prima-warning";

      case "cancelled":
      case "dibatalkan":
        return "bg-red-100 text-red-600";

      default:
        return "bg-prima-sand text-prima-green";
    }
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-4
        py-2
        text-sm
        font-medium
        whitespace-nowrap
        ${getStatusClass()}
      `}
    >
      {status}
    </span>
  );
}

export default PrescriptionStatusBadge;