import { useState } from "react";
import DoctorLayout from "../../layouts/doctor-layout";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaDownload } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonitoringPage() {
  const [patientsData] = useState({
    totalActive: 284,
    newPatients: 23,
    controlPatients: 18,
    absent: 6,
    topDiseases: [
      { name: "Batuk & Pilek", cases: 42 },
      { name: "Demam", cases: 35 },
      { name: "Hipertensi", cases: 28 },
      { name: "Diabetes Melitus", cases: 22 },
      { name: "Asma", cases: 15 },
    ],
    ageDistribution: {
      labels: ["Dewasa (18-60 thn)", "Lansia (>60 thn)"],
      data: [65, 35],
      colors: ["#437450", "#B9DDE8"],
    },
    genderDistribution: {
      labels: ["Perempuan", "Laki-laki"],
      data: [40, 60],
      colors: ["#437450", "#B9DDE8"],
    },
  });

  const ageChartData = {
    labels: patientsData.ageDistribution.labels,
    datasets: [
      {
        data: patientsData.ageDistribution.data,
        backgroundColor: patientsData.ageDistribution.colors,
        borderWidth: 0,
      },
    ],
  };

  const genderChartData = {
    labels: patientsData.genderDistribution.labels,
    datasets: [
      {
        data: patientsData.genderDistribution.data,
        backgroundColor: patientsData.genderDistribution.colors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <DoctorLayout>
      <div className="w-full max-w-[1050px] mx-auto space-y-6">
        {/* Header Tabs */}
        <div className="flex gap-4 items-center">
          <button className="px-4 py-2 rounded-full bg-[#437450] text-white text-sm font-medium">
            Ringkasan Pasien
          </button>
          <button className="px-4 py-2 rounded-full bg-[#ECE8DE] text-[#55636A] text-sm font-medium">
            Tren Konsultasi
          </button>
          <button className="px-4 py-2 rounded-full bg-[#ECE8DE] text-[#55636A] text-sm font-medium">
            Rekap Resep
          </button>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-[#437450] text-white text-sm font-medium">
            <FaDownload /> Unduh Laporan
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-[#F1EFE8] rounded-[12px] text-center">
            <p className="text-xs text-[#55636A]">Total Pasien Aktif</p>
            <p className="text-xl font-semibold">{patientsData.totalActive}</p>
            <p className="text-xs text-green-600">+12% bln ini</p>
          </div>
          <div className="p-4 bg-[#F1EFE8] rounded-[12px] text-center">
            <p className="text-xs text-[#55636A]">Pasien Baru</p>
            <p className="text-xl font-semibold">{patientsData.newPatients}</p>
            <p className="text-xs text-green-600">+5 bln ini</p>
          </div>
          <div className="p-4 bg-[#F1EFE8] rounded-[12px] text-center">
            <p className="text-xs text-[#55636A]">Pasien Kontrol</p>
            <p className="text-xl font-semibold">{patientsData.controlPatients}</p>
          </div>
          <div className="p-4 bg-[#F1EFE8] rounded-[12px] text-center">
            <p className="text-xs text-[#55636A]">Tidak Hadir</p>
            <p className="text-xl font-semibold text-red-600">{patientsData.absent}</p>
            <p className="text-xs text-red-600">-2% bln ini</p>
          </div>
        </div>

        {/* Top Diseases */}
        <div className="bg-white p-4 rounded-[12px]">
          <h3 className="text-sm font-semibold text-[#55636A] mb-2">Keluhan & Penyakit Terbanyak</h3>
          <div className="space-y-2">
            {patientsData.topDiseases.map((disease, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <p className="text-sm">{disease.name}</p>
                <div className="w-[60%] bg-[#ECE8DE] h-3 rounded-full relative">
                  <div
                    className="bg-[#437450] h-3 rounded-full absolute left-0 top-0"
                    style={{ width: `${(disease.cases / 42) * 100}%` }}
                  />
                </div>
                <p className="text-sm">{disease.cases} Kasus</p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-[12px]">
            <h3 className="text-sm font-semibold text-[#55636A] mb-2">Distribusi Usia</h3>
            <Pie data={ageChartData} />
          </div>
          <div className="bg-white p-4 rounded-[12px]">
            <h3 className="text-sm font-semibold text-[#55636A] mb-2">Jenis Kelamin</h3>
            <Pie data={genderChartData} />
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
}