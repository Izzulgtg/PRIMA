import { useNavigate } from "react-router-dom";

export default function PatientQueueItem({ patient }) {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/doctor/consultation-chat/${patient.id}`);
  };

  return (
    <div className="flex justify-between items-center p-3 rounded-xl mb-2 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {patient.avatar ? (
          <img src={patient.avatar} className="h-10 w-10 rounded-full" alt={patient.name} />
        ) : (
          <div className="h-10 w-10 rounded-full bg-[#B0C4B1] flex items-center justify-center text-white font-bold">
            {patient.name.split(" ").map(n => n[0]).join("")}
          </div>
        )}
        <div>
          <p>{patient.name}</p>
          <p className="text-xs">{patient.age} Thn • {patient.gender} • {patient.duration}</p>
        </div>
      </div>
      <button
        onClick={handleStart}
        className="px-4 py-2 bg-[#6B8F71] text-white rounded-lg font-semibold"
      >
        Mulai Konsultasi
      </button>
    </div>
  );
}