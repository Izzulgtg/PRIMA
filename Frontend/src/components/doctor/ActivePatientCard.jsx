function ActivePatientCard({ patient, status, onClick }) {
  const statusColor = {
    BERLANGSUNG: "bg-[#6B8F71] text-white",
    SELESAI: "bg-[#EDE8DC] text-[#6B7280]",
    MENUNGGU: "bg-[#EDE8DC] text-[#6B7280]",
  };

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${statusColor[status] || "bg-white"}`}>
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-[#EDE8DC] flex items-center justify-center">
          {/* bisa diganti foto pasien */}
          {patient.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div>
          <p className="text-sm font-bold">{patient.name}</p>
          <p className="text-xs">{patient.description}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        className="px-3 py-2 rounded-lg bg-[#FFFFFF] text-[#1E1E1E] text-xs font-semibold hover:bg-[#D6D3CB]"
      >
        Lanjutkan Chat
      </button>
    </div>
  );
}

export default ActivePatientCard;