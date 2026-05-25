function MonitoringPage() {
    const statistics = [
        {
            id: 1,
            label: "Pasien Hari Ini",
            value: 12,
            description: "Total pasien yang masuk antrian hari ini",
        },
        {
            id: 2,
            label: "Pemeriksaan Selesai",
            value: 8,
            description: "Pasien yang sudah selesai diperiksa",
        },
        {
            id: 3,
            label: "Konsultasi Daring",
            value: 5,
            description: "Sesi konsultasi online terjadwal",
        },
        {
            id: 4,
            label: "Obat Menipis",
            value: 2,
            description: "Jumlah obat dengan stok rendah",
        },
    ];

    const visitTrends = [
        {
            id: 1,
            day: "Senin",
            totalPatients: 10,
        },
        {
            id: 2,
            day: "Selasa",
            totalPatients: 14,
        },
        {
            id: 3,
            day: "Rabu",
            totalPatients: 8,
        },
        {
            id: 4,
            day: "Kamis",
            totalPatients: 12,
        },
        {
            id: 5,
            day: "Jumat",
            totalPatients: 9,
        },
    ];

    const reports = [
        {
            id: 1,
            title: "Kasus terbanyak",
            value: "Demam dan batuk ringan",
        },
        {
            id: 2,
            title: "Rata-rata pemeriksaan",
            value: "15 menit per pasien",
        },
        {
            id: 3,
            title: "Status layanan",
            value: "Aktif dan stabil",
        },
    ];

    return (
        <section className="p-6">
            <div>
                <h1 className="text-2xl font-semibold text-prima-black">
                    Monitoring Data
                </h1>

                <p className="mt-2 text-sm text-prima-gray">
                    Pantau statistik praktik dokter, tren kunjungan, dan ringkasan laporan
                    layanan.
                </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statistics.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-prima-gray">{item.label}</p>

                        <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                            {item.value}
                        </h2>

                        <p className="mt-2 text-sm text-prima-gray">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Tren Kunjungan Pasien
                    </h2>

                    <p className="mt-1 text-sm text-prima-gray">
                        Ringkasan jumlah pasien berdasarkan hari praktik.
                    </p>

                    <div className="mt-5 space-y-4">
                        {visitTrends.map((trend) => (
                            <div key={trend.id}>
                                <div className="mb-2 flex items-center justify-between">
                                    <p className="text-sm font-medium text-prima-black">
                                        {trend.day}
                                    </p>

                                    <p className="text-sm text-prima-gray">
                                        {trend.totalPatients} pasien
                                    </p>
                                </div>

                                <div className="h-3 rounded-full bg-prima-sand">
                                    <div
                                        className="h-3 rounded-full bg-prima-green"
                                        style={{ width: `${trend.totalPatients * 5}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Ringkasan Laporan
                    </h2>

                    <p className="mt-1 text-sm text-prima-gray">
                        Informasi cepat untuk evaluasi layanan dokter.
                    </p>

                    <div className="mt-5 space-y-4">
                        {reports.map((report) => (
                            <div
                                key={report.id}
                                className="rounded-2xl bg-prima-sand p-4"
                            >
                                <p className="text-sm text-prima-gray">{report.title}</p>

                                <p className="mt-1 font-medium text-prima-black">
                                    {report.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </section>
    );
}

export default MonitoringPage;