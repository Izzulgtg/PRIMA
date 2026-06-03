function PrescriptionStatusBadge({
  status = "Selesai",
}) {
  const normalized =
    status?.toLowerCase().trim();

  const styles = {
    selesai:
      "bg-prima-sand text-prima-green",
    completed:
      "bg-prima-sand text-prima-green",

    menunggu:
      "bg-yellow-100 text-yellow-700",
    pending:
      "bg-yellow-100 text-yellow-700",

    ditinjau:
      "bg-blue-100 text-prima-teal",
    reviewed:
      "bg-blue-100 text-prima-teal",

    dibatalkan:
      "bg-red-100 text-red-600",
    cancelled:
      "bg-red-100 text-red-600",

    "resep dikirim":
      "bg-orange-100 text-prima-warning",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-4
        py-2
        text-sm
        font-medium
        whitespace-nowrap
        ${
          styles[normalized] ||
          "bg-prima-sand text-prima-green"
        }
      `}
    >
      {status}
    </span>
  );
}

export default PrescriptionStatusBadge;