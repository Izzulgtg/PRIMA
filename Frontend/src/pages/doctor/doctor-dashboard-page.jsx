import PatientQueueCard from "@/components/doctor/patient-queue-card";
function DoctorDashboardPage() {
    const patientQueue = [
        {
            id: 1,
            name: "Budi Santoso",
            time: "08:00",
            complaint: "Demam dan sakit kepala sejak kemarin",
            status: "Menunggu",
        },
        {
            id: 2,
            name: "Siti Aminah",
            time: "08:30",
            complaint: "Batuk kering selama 3 hari",
            status: "Menunggu",
        },
        {
            id: 3,
            name: "Raka Pratama",
            time: "09:00",
            complaint: "Nyeri perut bagian bawah",
            status: "Dalam Antrian",
        },
    ];
    const waitingCount = patientQueue.filter(
        (patient) => patient.status === "Menunggu"
    ).length;

    const queueCount = patientQueue.filter(
        (patient) => patient.status === "Dalam Antrian"
    ).length;

    return (
        <main className="min-h-screen bg-prima-cream px-6 py-6">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-2xl font-semibold text-prima-black">
                    Dashboard Dokter
                </h1>
                <p className="mt-2 text-sm text-prima-gray">
                    Pantau antrian pasien hari ini dan mulai pemeriksaan sesuai jadwal praktik.
                </p>

                <section className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-prima-gray">
                            Total Antrian Hari Ini
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                            {patientQueue.length}
                        </h2>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-prima-gray">
                            Sedang Menunggu
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                            {waitingCount}
                        </h2>
                    </div>
                    <div className="rounded-2xl bg-white p-5 shadow-sm">
                        <p className="text-sm text-prima-gray">
                            Dalam Antrian
                        </p>

                        <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                            {queueCount}
                        </h2>
                    </div>

                </section>
                <section className="mt-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-prima-black">
                            Antrian Pasien
                        </h2>

                        <span className="rounded-full bg-prima-sand px-3 py-1 text-xs text-prima-teal">
                            Hari ini
                        </span>
                    </div>
                    <div className="mt-4 grid gap-4">
                        {patientQueue.map((patient) => (
                            <PatientQueueCard
                                key={patient.id}
                                patient={patient}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default DoctorDashboardPage;
