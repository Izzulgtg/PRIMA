import {
  Line,
  Doughnut
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);
import { useEffect, useState } from "react";
import { getStatistics } from "../../services/dokter/statistic-service";

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const COLORS = ["#6B8F71", "#8FB996"];

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error("Error statistik:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const trenData = {
  labels: stats?.tren?.map(item =>
    new Date(item.tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short"
    })
  ) || [],
  datasets: [
    {
      label: "Jumlah Konsultasi",
      data: stats?.tren?.map(item => item.total) || [],
      borderColor: "#6B8F71",
      backgroundColor: "#6B8F71",
      tension: 0.4
    }
  ]
};

const jenisData = {
  labels: ["Tatap Muka", "Daring"],
  datasets: [
    {
      data: [
        stats?.cards?.tatapMuka || 0,
        stats?.cards?.daring || 0
      ],
      backgroundColor: [
        "#6B8F71",
        "#B7D3BC"
      ]
    }
  ]
};

  return (
    <div className="p-6 bg-[#F7F4EC] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        Laporan & Statistik
      </h1>

      {/* CARD STATISTIK */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Total Konsultasi
          </h3>
          <p className="text-3xl font-bold text-[#6B8F71]">
            {stats?.cards?.totalKonsultasi || 0}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Tatap Muka
          </h3>
          <p className="text-3xl font-bold text-[#6B8F71]">
            {stats?.cards?.tatapMuka || 0}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Daring
          </h3>
          <p className="text-3xl font-bold text-[#6B8F71]">
            {stats?.cards?.daring || 0}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Rata-rata/Hari
          </h3>
          <p className="text-3xl font-bold text-[#6B8F71]">
            {stats?.cards?.rataPerHari || 0}
          </p>


        </div>

      </div>

      {/* TREN */}

<div className="bg-white rounded-xl shadow p-5 mb-6">
  <h2 className="font-semibold text-xl mb-4">
    Tren Konsultasi
  </h2>

  <Line data={trenData} />
</div>

      {/* JENIS KONSULTASI */}

<div className="bg-white rounded-xl shadow p-5 mb-6">
  <h2 className="font-semibold text-xl mb-4">
    Jenis Konsultasi
  </h2>

  <div className="w-[350px] mx-auto">
    <Doughnut data={jenisData} />
  </div>
  <div className="text-center mt-4">
  <h3 className="text-3xl font-bold">
    {stats?.cards?.totalKonsultasi}
  </h3>

  <p className="text-gray-500">
    Total Konsultasi
  </p>
</div>
</div>  

      {/* KELUHAN TERBANYAK */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="font-semibold text-xl mb-4">
          Keluhan Terbanyak
        </h2>

       <div className="space-y-4">
  {stats?.keluhanTerbanyak?.map((item,index)=>(
    <div key={index}>
      <div className="flex justify-between mb-1">
        <span>{item.keluhan}</span>
        <span>{item.total}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-[#6B8F71] h-3 rounded-full"
          style={{
            width: `${item.total * 20}%`
          }}
        />
      </div>
    </div>
  ))}
</div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-gray-500">
      Rata-rata Waktu Tunggu
    </h3>

    <p className="text-3xl font-bold text-[#6B8F71]">
      {stats?.rataWaktuTunggu || 12} Menit
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-gray-500">
      Rata-rata Durasi Konsultasi
    </h3>

    <p className="text-3xl font-bold text-[#6B8F71]">
      {stats?.rataDurasi || 18} Menit
    </p>
  </div>

  <div className="bg-white p-5 rounded-xl shadow">
    <h3 className="text-gray-500">
      Bulan Ini vs Bulan Lalu
    </h3>

    <p className="text-xl font-bold text-[#6B8F71]">
      {stats?.perbandingan?.bulanIni || 0}
    </p>

    <p className="text-sm text-gray-500">
      Bulan lalu:
      {" "}
      {stats?.perbandingan?.bulanLalu || 0}
    </p>
  </div>

</div>
    </div>
  );
}