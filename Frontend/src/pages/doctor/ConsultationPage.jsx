import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  CircleCheck,
  Hourglass,
  MessageSquare,
  FileText,
  Play,
  Filter,
  ListFilter,
  X 
} from "lucide-react";
import {
  getQueue,
  startConsultation,
} from "@/services/dokter/consultation-service";
import {
 useState,
 useEffect
} from "react";

function StatisticCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex h-[104px] items-center justify-between rounded-[12px] bg-[#EDE8DC] px-5">
      <div>
        <p className="text-[12px] text-[#6B7280]">{item.label}</p>
        <p className={`mt-1 text-[25px] font-semibold ${item.valueColor}`}>
          {item.value}
        </p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/60">
        <Icon size={20} strokeWidth={1.8} className={item.iconColor} />
      </div>
    </div>
  );
}

function ActiveConsultationCard({
    consultation,
  }) {
    const navigate = useNavigate();

    if (!consultation)
      return null;

  return (
    <div className="mt-4 flex min-h-[102px] items-center justify-between rounded-[13px] border-l-[5px] border-[#4A7C8E] bg-[#4A7C8E] px-5 py-4 text-white shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src="https://i.pravatar.cc/100?img=44"
            alt="Ibu Rastna Sari"
            className="h-[54px] w-[54px] rounded-full border-2 border-white object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#6B8F71]" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#13586A]">
              {consultation?.status
              ?.toUpperCase()}
            </span>
            <span className="text-[10px] text-white/70">
              Status:
              {" "}
              {consultation?.status}
            </span>
          </div>
          <p className="mt-1 text-[16px] font-semibold leading-none">
            {consultation?.pasien_nama}
          </p>
          <p className="mt-1.5 text-[11px] text-white/80">
            No. Antrian {consultation?.nomor_antrian}
          </p>
        </div>
      </div>

      <button
        onClick={() =>
          navigate(
            `/doctor/consultation-chat/${consultation.id}`
          )
        }
        className="ml-4 flex h-11 flex-shrink-0 items-center gap-2 rounded-[9px] bg-white px-5 text-[12px] font-semibold text-[#13586A] hover:bg-[#F3F4F1]"
      >
        <MessageSquare size={16} strokeWidth={2} />
        Lanjutkan Chat
      </button>
    </div>
  );
}

function PatientAvatar({ patient }) {
  if (patient.avatar) {
    return (
      <img
        src={patient.avatar}
        alt={patient.name}
        className={`h-11 w-11 rounded-full object-cover ${
          patient.type === "completed" ? "grayscale" : ""
        }`}
      />
    );
  }
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDE8DC] text-[13px] font-medium text-[#4A7C8E]">
      {patient.initials}
    </div>
  );
}

function QueueAction({ patient, onViewResume }) {
  const navigate = useNavigate();

  if (patient.type === "available") {
    return (
      <div className="flex items-center gap-5">
        <div className="hidden text-right sm:block">
          <p className="text-[9px] text-[#6B7280]">Mulai dalam</p>
          <p className="text-[11px] font-medium text-[#6B8F71]"> Segera </p>
        </div>
        <button
          onClick={async () => {
            try {
              const result =
                await startConsultation(
                  patient.id
                );

              console.log(result);

              navigate(
                `/doctor/consultation-chat/${patient.id}`
              );
            } catch (error) {
              console.error(
                "START ERROR",
                error
              );
            }
          }}
          className="flex h-10 items-center gap-2 rounded-[8px] bg-[#437450] px-5 text-[11px] font-semibold text-white shadow-sm hover:bg-[#365F41]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
            <Play size={10} fill="currentColor" />
          </span>
          Mulai Konsultasi
        </button>
      </div>
    );
  }

  if (patient.type === "completed") {
    return (
      <button 
        onClick={() => onViewResume(patient)}
        className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-[#6B8F71] hover:underline"
      >
        <FileText size={15} strokeWidth={1.8} />
        Lihat Resume
      </button>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <FileText size={16} strokeWidth={1.8} className="hidden text-[#6B7280] sm:block" />
      <button
        disabled
        className="h-10 min-w-[142px] cursor-not-allowed rounded-[8px] border border-[#EDE8DC] bg-white px-5 text-[11px] font-medium text-[#6B7280]/50"
      >
        Belum Waktunya
      </button>
    </div>
  );
}

function QueueItem({ patient, onViewResume }) {
  return (
    <div
      className={`relative flex min-h-[86px] items-center justify-between rounded-[13px] px-4 py-3 ${
        patient.type === "available"
          ? "border-l-[4px] border-[#6B8F71] bg-white shadow-sm"
          : "bg-white border border-[#EDE8DC]"
      } ${patient.type === "completed" ? "opacity-60" : ""}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-[58px] w-[66px] flex-shrink-0 flex-col items-center justify-center rounded-[10px] ${
            patient.type === "available" ? "bg-[#EDE8DC]" : "bg-[#F5F0E8]"
          }`}
        >
          <p className="text-[9px] font-medium tracking-wide text-[#6B7280]">
            {patient.timeLabel}
          </p>
          <p className={`mt-0.5 text-[17px] font-medium ${patient.type === "available" ? "text-[#6B8F71]" : "text-[#6B7280]"}`}>
            {patient.time}
          </p>
        </div>

        <PatientAvatar patient={patient} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[13px] font-semibold text-[#1E1E1E]">
              {patient.name}
            </p>
            <span
              className={`rounded px-2 py-0.5 text-[8px] font-semibold ${
                patient.type === "available"
                  ? "bg-[#EDE8DC] text-[#6B8F71]"
                  : "bg-[#F5F0E8] text-[#6B7280]"
              }`}
            >
              {patient.status}
            </span>
          </div>

          <p className="mt-1.5 text-[10px] text-[#737A7C]">
            No. Antrian{" "}
            {patient.nomor_antrian}
          </p>
        </div>
      </div>

      <QueueAction patient={patient} onViewResume={onViewResume} />
    </div>
  );
}

function ConsultationPage() {
  const [selectedPatientResume, setSelectedPatientResume] = useState(null);

  const [statistics, setStatistics] = useState([]);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response =
          await getQueue();

        const data =
          Array.isArray(response)
            ? response
            : [response];

        const mappedQueue =
          data.map((item) => ({
            id: item.id,
            pasien_nama:
              item.pasien_nama,
            nomor_antrian:
              item.nomor_antrian,
            status: item.status,

            name:
              item.pasien_nama,

            age: "-",
            gender: "-",
            duration: "-",

            time:
              item.nomor_antrian,

            timeLabel:
              "ANTRIAN",

            initials:
              item.pasien_nama
                ?.split(" ")
                .map(
                  (word) =>
                    word[0]
                )
                .join("")
                .substring(0, 2)
                .toUpperCase(),

            type:
              item.status === "selesai"
                ? "completed"
                : "available"
          }));

        setQueue(mappedQueue);

        setStatistics([
          {
            label:
              "Antrian Hari Ini",
            value:
              mappedQueue.length,
            valueColor:
              "text-[#416E50]",
            icon:
              CalendarDays,
            iconColor:
              "text-[#416E50]",
          },
          {
            label:
              "Menunggu",
            value:
              mappedQueue.filter(
                (item) =>
                  item.status ===
                  "menunggu"
              ).length,
            valueColor:
              "text-[#C18B2F]",
            icon:
              Hourglass,
            iconColor:
              "text-[#C18B2F]",
          },
          {
            label: "Berlangsung",
            value:
              mappedQueue.filter(
                item =>
                  item.status ===
                  "berlangsung"
              ).length,
            valueColor:
              "text-[#4A7C8E]",
            icon:
              MessageSquare,
            iconColor:
              "text-[#4A7C8E]",
          },
          {
            label:
              "Selesai",
            value:
              mappedQueue.filter(
                (item) =>
                  item.status ===
                  "selesai"
              ).length,
            valueColor:
              "text-[#437450]",
            icon:
              CircleCheck,
            iconColor:
              "text-[#437450]",
          },
        ]);
      } catch (error) {
        console.error(
          "Gagal mengambil antrean:",
          error
        );
      }
    };

    fetchQueue();
  }, []);
  
  return (
    <div className="mx-auto w-full max-w-[1050px] p-4 bg-[#F5F0E8] min-h-screen">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statistics.map((item) => (
          <StatisticCard key={item.label} item={item} />
        ))}
      </div>

      {queue.length > 0 && (
        <ActiveConsultationCard
          consultation={queue[0]}
        />
      )}

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-[#1E1E1E]">
            Antrian Hari Ini
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6B7280] shadow-sm hover:bg-[#EDE8DC]">
              <Filter size={15} strokeWidth={1.8} />
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#6B7280] shadow-sm hover:bg-[#EDE8DC]">
              <ListFilter size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {queue.map((patient) => (
            <QueueItem 
              key={patient.id} 
              patient={patient} 
              onViewResume={(p) => setSelectedPatientResume(p)} 
            />
          ))}
        </div>
      </section>

      {/* --- MODAL POP-UP RESUME IBU MARIA ULFA & PASIEN SELESAI --- */}
      {selectedPatientResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl border border-[#EDE8DC]">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-semibold text-[#1E1E1E]">
                Resume Rekam Medis Selesai
              </h3>
              <button 
                onClick={() => setSelectedPatientResume(null)}
                className="text-[#6B7280] hover:text-[#1E1E1E]"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-[#6B7280]">Nama Pasien</p>
                <p className="text-sm font-medium text-[#1E1E1E]">{selectedPatientResume.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-[#6B7280]">Usia / Gender</p>
                  <p className="text-sm font-medium text-[#1E1E1E]">{selectedPatientResume.age} Thn / {selectedPatientResume.gender}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7280]">Waktu Selesai</p>
                  <p className="text-sm font-medium text-[#6B8F71]">{selectedPatientResume.time} WIB</p>
                </div>
              </div>
              <div className="rounded-lg bg-[#F5F0E8] p-3 border border-[#EDE8DC]">
                <p className="text-xs font-semibold text-[#4A7C8E]">Catatan Keluhan & Diagnosis Akhir:</p>
                <p className="mt-1 text-xs text-[#1E1E1E] leading-relaxed">
                  {selectedPatientResume.complaint ||
                  "Belum ada catatan rekam medis."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPatientResume(null)}
                className="rounded-lg bg-[#6B8F71] px-4 py-2 text-xs font-semibold text-white hover:bg-[#57755c]"
              >
                Tutup Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConsultationPage;