import { useState } from "react";
import DoctorLayout from "../../layouts/doctor-layout";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Download } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function MonitoringPage() {
  const [patientsData] = useState({
    totalActive: 284,
    newPatients: 23,
    controlPatients: 18,
    absent: 6,

    topDiseases: [
      {
        name: "Batuk & Pilek",
        cases: 42,
      },
      {
        name: "Demam",
        cases: 35,
      },
      {
        name: "Hipertensi",
        cases: 28,
      },
      {
        name: "Diabetes Melitus",
        cases: 22,
      },
      {
        name: "Asma",
        cases: 15,
      },
    ],

    ageDistribution: {
      labels: [
        "Dewasa (18-60 thn)",
        "Lansia (>60 thn)",
      ],
      data: [65, 35],
      colors: [
        "#437450",
        "#B9DDE8",
      ],
    },

    genderDistribution: {
      labels: [
        "Perempuan",
        "Laki-laki",
      ],
      data: [40, 60],
      colors: [
        "#437450",
        "#B9DDE8",
      ],
    },
  });

  const ageChartData = {
    labels:
      patientsData.ageDistribution.labels,
    datasets: [
      {
        data:
          patientsData.ageDistribution
            .data,
        backgroundColor:
          patientsData.ageDistribution
            .colors,
        borderWidth: 0,
      },
    ],
  };

  const genderChartData = {
    labels:
      patientsData.genderDistribution
        .labels,
    datasets: [
      {
        data:
          patientsData.genderDistribution
            .data,
        backgroundColor:
          patientsData.genderDistribution
            .colors,
        borderWidth: 0,
      },
    ],
  };

  return (
    <DoctorLayout>
      <div className="mx-auto w-full max-w-[1050px] space-y-6">

        <div className="flex items-center gap-4">

          <button className="rounded-full bg-[#437450] px-4 py-2 text-sm font-medium text-white">
            Ringkasan Pasien
          </button>

          <button className="rounded-full bg-[#ECE8DE] px-4 py-2 text-sm font-medium text-[#55636A]">
            Tren Konsultasi
          </button>

          <button className="rounded-full bg-[#ECE8DE] px-4 py-2 text-sm font-medium text-[#55636A]">
            Rekap Resep
          </button>

          <button className="ml-auto flex items-center gap-2 rounded-full bg-[#437450] px-4 py-2 text-sm font-medium text-white">
            <Download size={16} />
            <span>Unduh Laporan</span>
          </button>

        </div>

        {/* lanjut isi file lama tanpa perubahan */}
      </div>
    </DoctorLayout>
  );
}