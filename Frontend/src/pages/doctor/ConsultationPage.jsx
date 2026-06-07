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
} from "lucide-react";

const statistics = [
  {
    label: "Terjadwal",
    value: 6,
    valueColor: "text-[#416E50]",
    icon: CalendarDays,
    iconColor: "text-[#416E50]",
  },
  {
    label: "Selesai",
    value: 2,
    valueColor: "text-[#416E50]",
    icon: CircleCheck,
    iconColor: "text-[#416E50]",
  },
  {
    label: "Menunggu",
    value: 4,
    valueColor: "text-[#3F7180]",
    icon: Hourglass,
    iconColor: "text-[#3F7180]",
  },
];

const queue = [
  {
    id: 1,
    timeLabel: "MULAI",
    time: "14:00",
    name: "Bp. Ahmad Hidayat",
    age: 28,
    gender: "Laki-laki",
    duration: "30 Menit",
    status: "WAKTUNYA",
    type: "available",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 2,
    timeLabel: "MULAI",
    time: "14:45",
    name: "Sdr. Siti Aminah",
    age: 22,
    gender: "Perempuan",
    duration: "30 Menit",
    status: "MENUNGGU",
    type: "waiting",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 3,
    timeLabel: "MULAI",
    time: "15:30",
    name: "Bp. Bambang Agus",
    age: 54,
    gender: "Laki-laki",
    duration: "30 Menit",
    status: "MENUNGGU",
    type: "waiting",
    initials: "BA",
  },
  {
    id: 4,
    timeLabel: "PUKUL",
    time: "11:00",
    name: "Ibu Maria Ulfa",
    age: 62,
    gender: "Perempuan",
    duration: "Selesai",
    status: "SELESAI",
    type: "completed",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
];

function StatisticCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex h-[104px] items-center justify-between rounded-[12px] bg-[#E8E5DE] px-5">
      <div>
        <p className="text-[12px] text-[#53717A]">{item.label}</p>
        <p className={`mt-1 text-[25px] font-semibold ${item.valueColor}`}>
          {item.value}
        </p>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9DAD3]">
        <Icon size={20} strokeWidth={1.8} className={item.iconColor} />
      </div>
    </div>
  );
}

function ActiveConsultationCard() {
  const navigate = useNavigate();

  return (
    <div className="mt-4 flex min-h-[102px] items-center justify-between rounded-[13px] border-l-[5px] border-[#4A99B2] bg-[#13586A] px-5 py-4 text-white shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative flex-shrink-0">
          <img
            src="https://i.pravatar.cc/100?img=44"
            alt="Ibu Rastna Sari"
            className="h-[54px] w-[54px] rounded-full border-2 border-white object-cover"
          />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#4CD187]" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold text-[#13586A]">
              BERLANGSUNG
            </span>
            <span className="text-[10px] text-white/70">14:25 Terlisa</span>
          </div>

          <p className="mt-1 text-[16px] font-semibold leading-none">
            Ibu Rastna Sari
          </p>

          <p className="mt-1.5 text-[11px] text-white/80">
            Konsultasi Diabetes Melitus • Sesi 2
          </p>
        </div>
      </div>

      <button
        onClick={() => navigate("/doctor/consultation-chat")}
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
    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#B9DDE8] text-[13px] font-medium text-[#397388]">
      {patient.initials}
    </div>
  );
}

function QueueAction({ patient }) {
  const navigate = useNavigate();

  if (patient.type === "available") {
    return (
      <div className="flex items-center gap-5">
        <div className="hidden text-right sm:block">
          <p className="text-[9px] text-[#6B7280]">Mulai dalam</p>
          <p className="text-[11px] font-medium text-[#456955]">05:22</p>
        </div>

        <button
          onClick={() => navigate("/doctor/consultation-chat")}
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
      <button className="flex items-center gap-2 px-3 py-2 text-[11px] font-medium text-[#64836E]">
        <FileText size={15} strokeWidth={1.8} />
        Lihat Resume
      </button>
    );
  }

  return (
    <div className="flex items-center gap-5">
      <FileText
        size={16}
        strokeWidth={1.8}
        className="hidden text-[#4A7C8E] sm:block"
      />

      <button
        disabled
        className="h-10 min-w-[142px] cursor-not-allowed rounded-[8px] border border-[#E6E3DC] bg-white px-5 text-[11px] font-medium text-[#9A9D9A]"
      >
        Belum Waktunya
      </button>
    </div>
  );
}

function QueueItem({ patient }) {
  return (
    <div
      className={`relative flex min-h-[86px] items-center justify-between rounded-[13px] px-4 py-3 ${
        patient.type === "available"
          ? "border-l-[4px] border-[#4F9365] bg-white shadow-sm"
          : "bg-[#ECE8DE]"
      } ${patient.type === "completed" ? "opacity-45" : ""}`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-[58px] w-[66px] flex-shrink-0 flex-col items-center justify-center rounded-[10px] ${
            patient.type === "available" ? "bg-[#E7EFE5]" : "bg-[#E3E0D8]"
          }`}
        >
          <p className="text-[9px] font-medium tracking-wide text-[#7B827E]">
            {patient.timeLabel}
          </p>
          <p
            className={`mt-0.5 text-[17px] font-medium ${
              patient.type === "available" ? "text-[#416E50]" : "text-[#8F918E]"
            }`}
          >
            {patient.time}
          </p>
        </div>

        <PatientAvatar patient={patient} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-[13px] font-semibold text-[#343B3D]">
              {patient.name}
            </p>

            <span
              className={`rounded px-2 py-0.5 text-[8px] font-semibold ${
                patient.type === "available"
                  ? "bg-[#DCEBDC] text-[#4E7B5C]"
                  : patient.type === "completed"
                  ? "bg-white text-[#8D938F]"
                  : "bg-transparent text-[#7A807D]"
              }`}
            >
              {patient.status}
            </span>
          </div>

          <p className="mt-1.5 text-[10px] text-[#737A7C]">
            {patient.age} Thn • {patient.gender} • {patient.duration}
          </p>
        </div>
      </div>

      <QueueAction patient={patient} />
    </div>
  );
}

function ConsultationPage() {
  return (
    <div className="mx-auto w-full max-w-[1050px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statistics.map((item) => (
          <StatisticCard key={item.label} item={item} />
        ))}
      </div>

      <ActiveConsultationCard />

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-[#477458]">
            Antrian Hari Ini
          </h2>

          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE9E1] text-[#6E7975] hover:bg-[#E2DED5]">
              <Filter size={15} strokeWidth={1.8} />
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ECE9E1] text-[#6E7975] hover:bg-[#E2DED5]">
              <ListFilter size={15} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {queue.map((patient) => (
            <QueueItem key={patient.id} patient={patient} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ConsultationPage;