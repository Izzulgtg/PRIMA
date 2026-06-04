import { Link } from "react-router-dom";

function PatientQueuePage() {
  const queueStats = [
    {
      id: 1,
      label: "Menunggu",
      value: 8,
      bg: "bg-[#FFF8E7]",
      text: "text-[#B68400]",
    },
    {
      id: 2,
      label: "Sedang Diperiksa",
      value: 1,
      bg: "bg-[#EAF7F8]",
      text: "text-[#4A7C8E]",
    },
    {
      id: 3,
      label: "Selesai",
      value: 5,
      bg: "bg-[#EDF7EA]",
      text: "text-[#6B8F71]",
    },
  ];

  const patients = [
    {
      id: 3,
      queueNumber: "A-03",
      name: "Zaidan",
      age: 20,
      gender: "Pria",
      type: "BPJS Kesehatan",
      complaint: "Sakit kepala bagian belakang sejak tadi pagi, disertai mual.",
      status: "Sedang Diperiksa",
      active: true,
    },
    {
      id: 4,
      queueNumber: "A-04",
      name: "Rifqi",
      age: 30,
      gender: "Pria",
      type: "Mandiri",
      complaint: "Nyeri ulu hati dan mual sejak tadi malam.",
      status: "Menunggu",
      active: false,
    },
    {
      id: 2,
      queueNumber: "A-02",
      name: "Rafi",
      age: 20,
      gender: "Pria",
      type: "Asuransi Swasta",
      complaint: "Kontrol rutin diabetes mellitus tipe 2.",
      status: "Selesai",
      active: false,
    },
  ];

  function getStatusClass(status) {
    if (status === "Sedang Diperiksa") {
      return "bg-[#EAF7F8] text-[#4A7C8E]";
    }

    if (status === "Menunggu") {
      return "bg-[#FFF8E7] text-[#B68400]";
    }

    return "bg-[#EDF7EA] text-[#6B8F71]";
  }

  return (
    <section className="p-7">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1E1E]">
          Antrian Pasien
        </h1>

        <p className="mt-2 text-sm text-[#6B7280]">
          Pantau status antrian pasien dan mulai pemeriksaan sesuai urutan.
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {queueStats.map((stat) => (
          <div key={stat.id} className={`${stat.bg} rounded-2xl p-6 shadow-sm`}>
            <p className="text-sm font-medium text-[#1E1E1E]">
              {stat.label}
            </p>

            <h2 className={`mt-2 text-4xl font-bold ${stat.text}`}>
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-[#6B8F71] px-5 py-2 text-xs font-semibold text-white">
            Semua
          </button>

          <button className="rounded-full bg-[#EDE8DC] px-5 py-2 text-xs font-semibold text-[#6B7280]">
            Menunggu
          </button>

          <button className="rounded-full bg-[#EDE8DC] px-5 py-2 text-xs font-semibold text-[#6B7280]">
            Sedang Diperiksa
          </button>

          <button className="rounded-full bg-[#EDE8DC] px-5 py-2 text-xs font-semibold text-[#6B7280]">
            Selesai
          </button>
        </div>

        <div className="w-full rounded-xl border border-[#D8D1C3] bg-white px-4 py-3 lg:w-80">
          <input
            type="text"
            className="w-full bg-transparent text-sm text-[#1E1E1E] outline-none placeholder:text-[#6B7280]"
            placeholder="Cari nama pasien..."
          />
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className={`rounded-2xl bg-white p-5 shadow-sm ${
              patient.active ? "border-l-4 border-[#6B8F71]" : ""
            }`}
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-5">
                <div
                  className={`flex h-24 w-20 flex-col items-center justify-center rounded-xl ${
                    patient.active
                      ? "bg-[#6B8F71] text-white"
                      : "bg-[#F5F0E8] text-[#6B7280]"
                  }`}
                >
                  <p className="text-[10px] font-semibold">NO.</p>
                  <p className="text-[10px] font-semibold">ANTRI</p>
                  <p className="mt-1 text-lg font-bold">
                    {patient.queueNumber}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-[#1E1E1E]">
                      {patient.name}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${getStatusClass(
                        patient.status
                      )}`}
                    >
                      {patient.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-[#6B7280]">
                    {patient.age} thn • {patient.gender} • {patient.type}
                  </p>

                  <p className="mt-2 max-w-2xl text-sm text-[#1E1E1E]">
                    {patient.complaint}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 lg:justify-end">
                {patient.status === "Sedang Diperiksa" && (
                  <Link
                    to={`/doctor/examination/${patient.id}`}
                    className="rounded-xl bg-[#6B8F71] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Lanjut Periksa
                  </Link>
                )}

                {patient.status === "Menunggu" && (
                  <>
                    <button className="rounded-xl border border-[#D8D1C3] px-5 py-3 text-sm font-semibold text-[#1E1E1E]">
                      Panggil
                    </button>

                    <Link
                      to={`/doctor/examination/${patient.id}`}
                      className="rounded-xl bg-[#6B8F71] px-5 py-3 text-sm font-semibold text-white"
                    >
                      Periksa
                    </Link>
                  </>
                )}

                {patient.status === "Selesai" && (
                  <Link
                    to="/doctor/medical-records"
                    className="rounded-xl border border-[#D8D1C3] px-5 py-3 text-sm font-semibold text-[#1E1E1E]"
                  >
                    Lihat Rekam Medis
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PatientQueuePage;