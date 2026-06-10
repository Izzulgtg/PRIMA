import React from "react";
import { FolderOpen, CheckCircle, ChevronRight } from "lucide-react";

export default function PatientCard({ patient, isCurrentActive, onAction }) {
  return (
    <div className={`bg-white rounded-[16px] p-5 shadow-xs border transition-all duration-300 ${
      isCurrentActive ? "border-[#6B8F71] ring-1 ring-[#6B8F71]/30 bg-white" : "border-gray-100"
    }`}>
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
          isCurrentActive ? "bg-[#E8F0E9] text-[#43644E]" : "bg-gray-100 text-gray-500"
        }`}>
          {patient.id}
        </span>
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          isCurrentActive ? "bg-[#6B8F71] text-white" :
          patient.status === "Menunggu" ? "bg-[#ECE8DC] text-[#6E7975]" : "bg-gray-100 text-gray-400"
        }`}>
          {patient.status}
        </span>
      </div>

      <h3 className="text-[16px] font-bold text-gray-800 mb-1">{patient.name}</h3>
      <p className="text-[12px] text-gray-400 flex items-center gap-1.5 mb-4">
        <FolderOpen size={14} className="text-gray-400" /> {patient.complaint}
      </p>

      {patient.status === "Selesai" ? (
        <div className="w-full bg-gray-50 text-gray-400 text-[12px] font-bold py-2.5 px-4 rounded-[10px] flex items-center justify-center gap-1.5 border border-dashed opacity-70">
          <CheckCircle size={14} className="text-emerald-600" /> Terperiksa
        </div>
      ) : (
        <button 
          onClick={() => onAction(patient)}
          className={`w-full text-[12px] font-bold py-2.5 px-4 rounded-[10px] transition-all flex items-center justify-center gap-1.5 ${
            isCurrentActive 
              ? "bg-[#C4846A] hover:bg-[#b3755c] text-white shadow-xs" 
              : "bg-[#43644E] hover:bg-[#354F3E] text-white"
          }`}
        >
          {isCurrentActive ? (
            <>Selesaikan Pemeriksaan <CheckCircle size={14} /></>
          ) : (
            <>Periksa Sekarang <ChevronRight size={14} /></>
          )}
        </button>
      )}
    </div>
  );
}