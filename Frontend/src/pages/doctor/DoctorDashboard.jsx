// src/pages/doctor/DashboardPage.jsx
import { useState } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarDays,
  MessageSquare,
  Activity,
  Users,
  Pill,
  ChartNoAxesCombined,
} from "lucide-react";

const antrianPatients = [
  {
    id: 2,
    name: "Zaki",
    condition: "Batuk, pilek, demam",
    status: "Sedang Diperiksa",
    button: "Periksa Sekarang",
  },
  {
    id: 3,
    name: "Verdi",
    condition: "Tes Rutin",
    status: "Menunggu",
    button: "Panggil Pasien",
  },
  {
    id: 1,
    name: "Riel",
    condition: "Kontrol",
    status: "Selesai",
    button: null,
  },
];

const riwayatMedis = [
  { date: "12/01/2024", diagnosis: "Influenza", type: "Umum", note: `"3 hari pusing dan hidung tersumbat"`, obat: "Paracetamol" },
  { date: "05/11/2023", diagnosis: "Gastritis Ringan", type: "Umum", note: "", obat: "Panadol" },
  { date: "20/08/2023", diagnosis: "Check-up Tahunan", type: "Kontrol", note: "Hasil Tekanan Darah Rendah, Kolesterol sedikit tinggi", obat: "" },
];

export default function DashboardPage() {
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newMedicine, setNewMedicine] = useState("Antangin");

  return (
    <main className="flex-1 bg-[#F7F3EB] py-7 space-y-6">
      {/* Antrian Pasien */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-semibold text-[#477458]">Antrian Pasien</h2>
          <a href="#" className="text-[13px] font-medium text-[#6B8F71] hover:underline">
            Lihat Semua
          </a>
        </div>

        <div className="flex gap-4">
          {antrianPatients.map((p) => (
            <div key={p.id} className="flex-1 rounded-[10px] bg-white p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <p className="text-[12px] text-[#7A8388]">0{p.id}</p>
                <span className="rounded-full bg-[#D9E6DB] px-2 py-0.5 text-[9px] font-semibold text-[#4A7C5E]">{p.status}</span>
              </div>
              <p className="text-[14px] font-semibold">{p.name}</p>
              <p className="text-[12px] text-[#737A7C] mb-3">{p.condition}</p>
              {p.button && (
                <button className="w-full rounded-[8px] bg-[#456955] px-3 py-2 text-[12px] font-semibold text-white hover:bg-[#365F41]">
                  {p.button}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Riwayat Medis & Pemeriksaan Baru */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Riwayat Medis */}
        <div className="space-y-3">
          <h2 className="text-[15px] font-semibold">Riwayat Medis (Nama Pasien)</h2>
          {riwayatMedis.map((r, i) => (
            <div key={i} className="rounded-[10px] bg-[#F2F0EA] p-4 text-[12px]">
              <p className="font-semibold">{r.date} - {r.diagnosis} - {r.type}</p>
              <p className="text-[#737A7C]">{r.obat}</p>
              {r.note && <p className="text-[#737A7C] italic">{r.note}</p>}
            </div>
          ))}
        </div>

        {/* Pemeriksaan Baru */}
        <div className="rounded-[10px] bg-white p-4 space-y-3 shadow-sm">
          <h2 className="text-[15px] font-semibold">Pemeriksaan Baru</h2>
          <div className="grid grid-cols-3 gap-2 text-[12px]">
            <input type="text" placeholder="TD (mmHg)" className="rounded border border-[#E0E0E0] p-2" />
            <input type="text" placeholder="Suhu (°C)" className="rounded border border-[#E0E0E0] p-2" />
            <input type="text" placeholder="Berat (Kg)" className="rounded border border-[#E0E0E0] p-2" />
          </div>
          <input
            type="text"
            placeholder="Diagnosis Utama"
            value={newDiagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
            className="w-full rounded border border-[#E0E0E0] p-2 text-[12px]"
          />
          <textarea
            placeholder="Catatan Tambahan"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full rounded border border-[#E0E0E0] p-2 text-[12px]"
          />
          <input
            type="text"
            placeholder="Resep Obat"
            value={newMedicine}
            onChange={(e) => setNewMedicine(e.target.value)}
            className="w-full rounded border border-[#E0E0E0] p-2 text-[12px]"
          />
          <div className="flex gap-2">
            <button className="flex-1 rounded-[8px] bg-[#456955] py-2 text-white text-[12px] font-semibold hover:bg-[#365F41]">
              Simpan & Selesaikan
            </button>
            <button className="flex-1 rounded-[8px] bg-[#E0E0E0] py-2 text-[#55636A] text-[12px] font-semibold hover:bg-[#D9D9D9]">
              Simpan Draft
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}