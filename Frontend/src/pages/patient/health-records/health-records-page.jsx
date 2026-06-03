import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Pill,
  HeartPulse,
} from "lucide-react";

import HealthSummaryCard from "@/components/patient/health-records/health-summary-card";
import MedicalHistoryFilter from "@/components/patient/health-records/medical-history-filter";
import MedicalRecordCard from "@/components/patient/health-records/medical-record-card";
import MedicationHistoryCard from "@/components/patient/health-records/medication-history-card";

import { formatDate } from "@/utils/patient/format-date";
import { dummyHealthRecords } from "@/data/dummy-health-records";

function HealthRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] =
    useState("");

  useEffect(() => {
    setRecords(dummyHealthRecords);
    setLoading(false);
  }, []);

  const sortedRecords = useMemo(() => {
    return [...records].sort(
      (a, b) =>
        new Date(b.tanggal_periksa) -
        new Date(a.tanggal_periksa)
    );
  }, [records]);

  const filteredRecords = useMemo(() => {
    if (!filterStatus) {
      return sortedRecords;
    }

    return sortedRecords.filter(
      (record) =>
        record.status_resep
          ?.toLowerCase()
          .trim() === filterStatus
    );
  }, [sortedRecords, filterStatus]);

  const latestVisit =
    sortedRecords.length > 0
      ? formatDate(
          sortedRecords[0].tanggal_periksa
        )
      : "-";

  const medicationHistory = useMemo(() => {
    return sortedRecords.flatMap((record) =>
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
  }, [sortedRecords]);

  const totalConsultation =
    records.length;

  const totalPrescription =
    records.filter(
      (record) => record.catatan_resep
    ).length;

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="overflow-hidden rounded-[32px] bg-prima-green px-8 py-10 text-white">

        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row">

          <div className="max-w-2xl">

            <p className="text-sm opacity-80">
              Electronic Medical Record
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight lg:text-5xl">
              Riwayat Kesehatan &
              Rekam Medis
            </h1>

            <p className="mt-5 text-lg leading-relaxed opacity-90">
              Pantau riwayat konsultasi,
              diagnosis, dan resep obat
              Anda secara aman melalui
              PRIMA.
            </p>

          </div>

          <div className="w-full max-w-[340px] rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">

            <p className="text-sm opacity-80">
              Health Status
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              Stable
            </h3>

            <p className="mt-3 leading-relaxed opacity-80">
              Kondisi kesehatan terakhir
              dalam status baik.
            </p>

            <div className="mt-6 flex items-center gap-2">

              <div className="h-3 w-3 animate-pulse rounded-full bg-green-300" />

              <span className="text-sm">
                Medical Record Active
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* SUMMARY */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <HealthSummaryCard
          title="Total Consultation"
          value={totalConsultation}
          icon={<HeartPulse size={22} />}
        />

        <HealthSummaryCard
          title="Total Prescription"
          value={totalPrescription}
          icon={<Pill size={22} />}
        />

        <HealthSummaryCard
          title="Last Visit"
          value={latestVisit}
          icon={<Activity size={22} />}
        />

      </section>

      {/* CONTENT */}
      <section className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-8 shadow-sm">

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">

          {/* LEFT */}
          <div className="xl:col-span-8">

            <div className="flex flex-col gap-4 border-b border-[#E7E1D8] pb-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-prima-secondary">
                  Medical Timeline
                </p>

                <h2 className="mt-2 text-3xl font-bold text-prima-text">
                  Consultation History
                </h2>

              </div>

              <MedicalHistoryFilter
                value={filterStatus}
                onChange={setFilterStatus}
              />

            </div>

            {loading && (
              <div className="py-10 text-center text-prima-secondary">
                Memuat riwayat medis...
              </div>
            )}

            {!loading &&
              records.length === 0 && (
                <div className="py-10 text-center text-prima-secondary">
                  Belum ada riwayat
                  pemeriksaan.
                </div>
              )}

            {!loading &&
              filteredRecords.length >
                0 && (
                <div className="mt-8 max-h-[800px] space-y-5 overflow-y-auto pr-3">

                  {filteredRecords.map(
                    (record) => (
                      <MedicalRecordCard
                        key={
                          record.rekam_medis_id
                        }
                        date={formatDate(
                          record.tanggal_periksa
                        )}
                        doctor={
                          record.nama_dokter
                        }
                        specialization={
                          record.spesialisasi ||
                          "-"
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
                          record.status_resep ||
                          "Selesai"
                        }
                      />
                    )
                  )}

                </div>
              )}

          </div>

          {/* RIGHT */}
          <div className="xl:col-span-4">

            <div className="sticky top-6 rounded-[28px] border border-[#F1ECE4] bg-prima-background p-6 shadow-sm">

              <p className="text-sm text-prima-secondary">
                Medication History
              </p>

              <h2 className="mt-2 text-2xl font-bold text-prima-text">
                Daftar Obat
              </h2>

              <div className="mt-4 border-t border-[#E7E1D8]" />

              <p className="mt-3 text-sm text-prima-secondary">
                Riwayat obat yang telah
                diresepkan dokter.
              </p>

              <div className="mt-6 max-h-[800px] space-y-4 overflow-y-auto pr-2">

                {medicationHistory.length ===
                0 ? (
                  <div className="py-8 text-center text-prima-secondary">
                    Belum ada riwayat
                    obat.
                  </div>
                ) : (
                  medicationHistory.map(
                    (
                      item,
                      index
                    ) => (
                      <MedicationHistoryCard
                        key={`${item.medicine}-${index}`}
                        medicine={
                          item.medicine
                        }
                        doctor={
                          item.doctor
                        }
                        date={
                          item.date
                        }
                        status={
                          item.status
                        }
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