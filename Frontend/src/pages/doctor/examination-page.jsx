import { useState } from "react";
import { useParams } from "react-router-dom";

function ExaminationPage() {
    const { patientId } = useParams();

    const patients = [
        {
            id: 1,
            name: "Budi Santoso",
            age: 35,
            gender: "Laki-laki",
            complaint: "Demam dan sakit kepala sejak kemarin",
            lastVisit: "12 Mei 2026",
            medicineHistory: "Paracetamol 500mg",
        },
        {
            id: 2,
            name: "Siti Aminah",
            age: 28,
            gender: "Perempuan",
            complaint: "Batuk kering selama 3 hari",
            lastVisit: "10 Mei 2026",
            medicineHistory: "OBH dan vitamin C",
        },
        {
            id: 3,
            name: "Raka Pratama",
            age: 42,
            gender: "Laki-laki",
            complaint: "Nyeri perut bagian bawah",
            lastVisit: "Belum ada riwayat",
            medicineHistory: "Belum ada riwayat obat",
        },
    ];

    const selectedPatient = patients.find(
        (patient) => patient.id === Number(patientId)
    );

    const [formData, setFormData] = useState({
        complaint: "",
        physicalExam: "",
        diagnosis: "",
        prescription: "",
        notes: "",
    });
    const [lastExamination, setLastExamination] = useState(null);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const examinationData = {
            patientId,
            ...formData,
        };

        console.log("Data pemeriksaan:", examinationData);
        setLastExamination(examinationData);

        setFormData({
            complaint: "",
            physicalExam: "",
            diagnosis: "",
            prescription: "",
            notes: "",
        });

        alert("Data pemeriksaan sementara berhasil dicatat di console.");
    }

    return (
        <section className="p-6">
            <div>
                <h1 className="text-2xl font-semibold text-prima-black">
                    Pemeriksaan Pasien
                </h1>

                <p className="mt-2 text-sm text-prima-gray">
                    Lihat ringkasan pasien dan catat hasil pemeriksaan baru.
                </p>

                <p className="mt-3 text-sm text-prima-teal">
                    ID pasien yang sedang diperiksa:{" "}
                    {patientId || "Belum memilih pasien"}
                </p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <aside className="rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Informasi Pasien
                    </h2>

                    {!selectedPatient && (
                        <p className="mt-4 text-sm text-prima-gray">
                            Pilih pasien dari dashboard antrian untuk melihat detail
                            pemeriksaan.
                        </p>
                    )}

                    {selectedPatient && (
                        <div className="mt-4 space-y-4">
                            <div>
                                <p className="text-xs text-prima-gray">Nama Pasien</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-prima-gray">Umur</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.age} tahun
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-prima-gray">Jenis Kelamin</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.gender}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-prima-gray">Keluhan Awal</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.complaint}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-prima-gray">Kunjungan Terakhir</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.lastVisit}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-prima-gray">Riwayat Obat</p>
                                <p className="font-medium text-prima-black">
                                    {selectedPatient.medicineHistory}
                                </p>
                            </div>
                        </div>
                    )}
                </aside>

                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Form Pemeriksaan Baru
                    </h2>

                    <p className="mt-1 text-sm text-prima-gray">
                        Catat hasil pemeriksaan pasien dengan jelas dan ringkas.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                        <div>
                            <label className="text-sm font-medium text-prima-black">
                                Keluhan Pasien
                            </label>

                            <textarea
                                name="complaint"
                                value={formData.complaint}
                                onChange={handleChange}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                placeholder="Contoh: Demam, pusing, nyeri tenggorokan..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-prima-black">
                                Pemeriksaan Fisik
                            </label>

                            <textarea
                                name="physicalExam"
                                value={formData.physicalExam}
                                onChange={handleChange}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                placeholder="Contoh: Suhu 38°C, tekanan darah 120/80, tenggorokan tampak merah..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-prima-black">
                                Diagnosis
                            </label>

                            <textarea
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                placeholder="Contoh: Infeksi saluran pernapasan atas ringan..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-prima-black">
                                Resep Obat
                            </label>

                            <textarea
                                name="prescription"
                                value={formData.prescription}
                                onChange={handleChange}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                placeholder="Contoh: Paracetamol 500mg, 3x sehari setelah makan..."
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-prima-black">
                                Catatan Tambahan
                            </label>

                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="mt-2 w-full rounded-2xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                placeholder="Contoh: Pasien disarankan kontrol ulang jika demam tidak turun dalam 3 hari."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!selectedPatient}
                                className="rounded-xl bg-prima-green px-5 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Simpan Pemeriksaan
                            </button>
                        </div>
                    </form>

                    {lastExamination && (
                        <div className="mt-6 rounded-2xl bg-prima-sand p-5">
                            <h3 className="font-semibold text-prima-black">
                                Ringkasan Pemeriksaan Terakhir
                            </h3>

                            <div className="mt-4 space-y-3 text-sm">
                                <div>
                                    <p className="text-prima-gray">Keluhan</p>
                                    <p className="text-prima-black">
                                        {lastExamination.complaint || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-prima-gray">Pemeriksaan Fisik</p>
                                    <p className="text-prima-black">
                                        {lastExamination.physicalExam || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-prima-gray">Diagnosis</p>
                                    <p className="text-prima-black">
                                        {lastExamination.diagnosis || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-prima-gray">Resep Obat</p>
                                    <p className="text-prima-black">
                                        {lastExamination.prescription || "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-prima-gray">Catatan Tambahan</p>
                                    <p className="text-prima-black">
                                        {lastExamination.notes || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

export default ExaminationPage;