import React, { useState } from "react";
import ConsultationQueueCard from "../../components/doctor/ConsultationQueueCard";
import ConsultationSummaryCard from "../../components/doctor/ConsultationSummaryCard";

export default function ConsultationPage() {
  const summary = [
    { label: "Terjadwal", count: 6, icon: "📅" },
    { label: "Selesai", count: 2, icon: "✔️" },
    { label: "Menunggu", count: 4, icon: "⏳" },
  ];

  const patients = [
    { id: 1, name: "Ibu Ratna Sari", status: "Berlangsung", info: "Konsultasi Diabetes Melitus • Sesi 2" },
    { id: 2, name: "Bp. Ahmad Hidayat", status: "Menunggu", info: "28 Thn • Laki-laki • 30 Menit" },
    { id: 3, name: "Sdr. Siti Aminah", status: "Menunggu", info: "22 Thn • Perempuan • 30 Menit" },
    { id: 4, name: "Bp. Bambang Agus", status: "Menunggu", info: "54 Thn • Laki-laki • 30 Menit" },
    { id: 5, name: "Ibu Maria Ulfa", status: "Selesai", info: "62 Thn • Perempuan • Selesai" },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex gap-4">
        {summary.map((s, idx) => (
          <ConsultationSummaryCard key={idx} label={s.label} count={s.count} icon={s.icon} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {patients.map(p => (
          <ConsultationQueueCard key={p.id} patient={p} />
        ))}
      </div>
    </div>
  );
}