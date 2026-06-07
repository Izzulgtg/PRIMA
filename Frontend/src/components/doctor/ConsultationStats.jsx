function ConsultationStats({ scheduled, completed, waiting }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-[#FFFFFF] rounded-xl p-4 shadow-sm text-center">
        <p className="text-xs text-[#6B7280]">Terjadwal</p>
        <p className="text-lg font-bold text-[#1E1E1E]">{scheduled}</p>
      </div>
      <div className="flex-1 bg-[#FFFFFF] rounded-xl p-4 shadow-sm text-center">
        <p className="text-xs text-[#6B7280]">Selesai</p>
        <p className="text-lg font-bold text-[#1E1E1E]">{completed}</p>
      </div>
      <div className="flex-1 bg-[#FFFFFF] rounded-xl p-4 shadow-sm text-center">
        <p className="text-xs text-[#6B7280]">Menunggu</p>
        <p className="text-lg font-bold text-[#1E1E1E]">{waiting}</p>
      </div>
    </div>
  );
}

export default ConsultationStats;