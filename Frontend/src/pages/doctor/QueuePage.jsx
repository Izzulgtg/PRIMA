// src/pages/doctor/QueuePage.jsx
import { useState } from "react";
import { UserCheck, CheckCircle2, UserMinus, Search } from "lucide-react";

const initialQueue = [
  {
    id: 3,
    name: "Zaidan",
    age: 20,
    gender: "Pria",
    insurance: "BPJS Kesehatan",
    status: "Sedang Diperiksa",
    note: "Sakit kepala bagian belakang sejak tadi pagi, disertai mual.",
  },
  {
    id: 4,
    name: "Rifqi",
    age: 30,
    gender: "Pria",
    insurance: "Mandiri",
    status: "Menunggu",
    note: "Nyeri ulu hati dan mual sejak tadi malam.",
  },
  {
    id: 2,
    name: "Rafi",
    age: 20,
    gender: "Pria",
    insurance: "Asuransi Swasta",
    status: "Selesai",
    note: "Kontrol rutin diabetes melitus tipe 2.",
  },
];

export default function QueuePage() {
  const [queue, setQueue] = useState(initialQueue);
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filteredQueue = queue.filter((p) => {
    const statusMatch = filter === "Semua" || p.status === filter;
    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
    return statusMatch && searchMatch;
  });

  const summary = {
    Menunggu: queue.filter((p) => p.status === "Menunggu").length,
    "Sedang Diperiksa": queue.filter((p) => p.status === "Sedang Diperiksa").length,
    Selesai: queue.filter((p) => p.status === "Selesai").length,
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1 rounded-lg bg-yellow-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Menunggu</p>
            <p className="text-xl font-semibold">{summary.Menunggu}</p>
          </div>
          <UserMinus className="w-6 h-6 text-yellow-400" />
        </div>
        <div className="flex-1 rounded-lg bg-blue-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Sedang Diperiksa</p>
            <p className="text-xl font-semibold">{summary["Sedang Diperiksa"]}</p>
          </div>
          <UserCheck className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1 rounded-lg bg-green-50 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-sm text-[#7A7A7A]">Selesai</p>
            <p className="text-xl font-semibold">{summary.Selesai}</p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-green-400" />
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex gap-2">
          {["Semua", "Menunggu", "Sedang Diperiksa", "Selesai"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1 rounded-full border text-sm font-medium ${
                filter === f
                  ? "bg-[#456955] text-white"
                  : "bg-white border-[#D9D9D9] text-[#4A4A4A]"
              }`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Cari nama pasien..."
            className="w-full rounded-full border border-[#D9D9D9] px-4 py-2 pl-10 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Patient List */}
      <div className="space-y-3">
        {filteredQueue.map((p) => (
          <div
            key={p.id}
            className={`flex items-center justify-between bg-white rounded-lg p-4 shadow-sm ${
              p.status === "Sedang Diperiksa" ? "border-l-4 border-blue-400" :
              p.status === "Menunggu" ? "border-l-4 border-yellow-400" :
              "border-l-4 border-green-400"
            }`}
          >
            <div className="flex-1 flex items-center gap-4">
              <div className="bg-[#E0E6DC] p-4 rounded-lg text-sm font-semibold text-[#4A7C5E]">
                {`A-0${p.id}`}
              </div>
              <div className="flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{`${p.age} thn • ${p.gender} • ${p.insurance}`}</p>
                <p className="text-sm italic text-gray-600">{`"${p.note}"`}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {p.status === "Menunggu" && (
                <button className="bg-white border border-[#456955] text-[#456955] px-4 py-2 rounded-lg hover:bg-[#456955] hover:text-white">
                  Panggil
                </button>
              )}
              {p.status === "Sedang Diperiksa" && (
                <button className="bg-[#456955] text-white px-4 py-2 rounded-lg hover:bg-[#365F41]">
                  Lanjut Periksa
                </button>
              )}
              {p.status === "Selesai" && (
                <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200">
                  Lihat Rekam Medis
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}