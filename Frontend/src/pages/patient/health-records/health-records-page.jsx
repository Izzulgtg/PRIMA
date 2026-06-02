import { useEffect, useState } from "react";
import {
  Activity,
  Pill,
  HeartPulse,
} from "lucide-react";

import MedicalRecordCard from "@/components/patient/health-records/medical-record-card";
import MedicationHistoryCard from "@/components/patient/health-records/medication-history-card";

import { formatDate } from "@/utils/patient/format-date";

import { dummyHealthRecords } from "@/data/dummy-health-records";

function HealthRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setRecords(dummyHealthRecords);
    setLoading(false);
  }, []);

  const sortedRecords = [...records].sort(
    (a, b) =>
      new Date(b.tanggal_periksa) -
      new Date(a.tanggal_periksa)
  );

  const latestVisit =
    sortedRecords.length > 0
      ? formatDate(
          sortedRecords[0].tanggal_periksa
        )
      : "-";

  const medicationHistory =
    sortedRecords.flatMap((record) =>
      record.daftar_obat
        ? record.daftar_obat
            .split("|")
            .map((medicine) => ({
              medicine: medicine.trim(),
              doctor: record.nama_dokter,
              date: record.tanggal_periksa,
              status:
                record.status_resep ||
                "Selesai",
            }))
        : []
    );

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="bg-prima-green rounded-[32px] p-8 text-white">

        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">

          <div className="max-w-2xl">

            <p className="text-sm opacity-80">
              Electronic Medical Record
            </p>

            <h1 className="text-4xl font-bold mt-3 leading-tight">
              Riwayat Kesehatan & Rekam Medis
            </h1>

            <p className="mt-5 text-lg opacity-90 leading-relaxed">
              Pantau riwayat konsultasi, diagnosis,
              dan resep obat Anda secara aman melalui
              PRIMA.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 w-[320px] border border-white/10">

            <p className="text-sm opacity-80">
              Health Status
            </p>

            <h3 className="text-3xl font-bold mt-3">
              Stable
            </h3>

            <p className="mt-3 opacity-80 leading-relaxed">
              Kondisi kesehatan terakhir dalam status
              baik.
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="w-3 h-3 rounded-full bg-green-300 animate-pulse" />

              <span className="text-sm">
                Medical Record Active
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* TOTAL CONSULTATION */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">
            <HeartPulse size={22} />
          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Total Consultation
          </p>

          <h2 className="text-4xl font-bold text-prima-text mt-2">
            {records.length}
          </h2>

        </div>

        {/* TOTAL PRESCRIPTION */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">
            <Pill size={22} />
          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Total Prescription
          </p>

          <h2 className="text-4xl font-bold text-prima-text mt-2">
            {
              records.filter(
                (record) => record.catatan_resep
              ).length
            }
          </h2>

        </div>

        {/* LAST VISIT */}
        <div className="bg-prima-card rounded-[28px] p-6 border border-[#F1ECE4] shadow-sm">

          <div className="w-12 h-12 rounded-2xl bg-prima-sand flex items-center justify-center text-prima-green">
            <Activity size={22} />
          </div>

          <p className="text-sm text-prima-secondary mt-5">
            Last Visit
          </p>

          <h2 className="text-2xl font-bold text-prima-text mt-2">
            {latestVisit}
          </h2>

        </div>

      </section>

      {/* MEDICAL TIMELINE + MEDICATION HISTORY */}
<section className="bg-prima-card rounded-[32px] p-8 border border-[#F1ECE4] shadow-sm">

  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

    {/* LEFT SIDE */}
    <div className="xl:col-span-2">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-prima-secondary">
            Medical Timeline
          </p>

          <h2 className="text-3xl font-bold text-prima-text mt-2">
            Consultation History
          </h2>

        </div>

        <button className="text-prima-teal font-medium hover:underline">
          View All
        </button>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-10 text-center">

          <p className="text-prima-secondary">
            Memuat riwayat medis...
          </p>

        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        records.length === 0 && (
          <div className="py-10 text-center">

            <p className="text-prima-secondary">
              Belum ada riwayat pemeriksaan.
            </p>

          </div>
        )}

      {/* RECORDS */}
      {!loading &&
        records.length > 0 && (
          <div className="mt-8 space-y-5">

            {sortedRecords.map((record) => (
              <MedicalRecordCard
                key={record.rekam_medis_id}
                date={formatDate(
                  record.tanggal_periksa
                )}
                doctor={record.nama_dokter}
                specialization={
                  record.spesialisasi || "-"
                }
                diagnosis={
                  record.diagnosis
                }
                complaint={
                  record.keluhan
                }
                prescription={
                  record.catatan_resep
                }
                medicines={
                  record.daftar_obat
                    ? record.daftar_obat.split(
                        "|"
                      )
                    : []
                }
                status={
                  record.catatan_resep
                    ? record.status_resep
                    : "Selesai"
                }
              />
            ))}

          </div>
        )}

    </div>

    {/* RIGHT SIDE */}
      <div>
        <div className="rounded-[28px] bg-prima-background border border-[#F1ECE4] p-6">

          <p className="text-sm text-prima-secondary">
            Medication History
          </p>

          <h2 className="mt-2 text-2xl font-bold text-prima-text">
            Daftar Obat
          </h2>

          <div className="mt-6 space-y-4">

            {medicationHistory.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-prima-secondary">
                  Belum ada riwayat obat.
                </p>
              </div>
            ) : (
              medicationHistory.map(
                (item, index) => (
                  <MedicationHistoryCard
                    key={`${item.medicine}-${index}`}
                    medicine={item.medicine}
                    doctor={item.doctor}
                    date={item.date}
                    status={item.status}
                  />
                )
              )
            )}

          </div>

        </div>
      </div>

  </div>

</section>

    </div>
  );
}

export default HealthRecordsPage;