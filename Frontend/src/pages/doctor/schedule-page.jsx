import { useState } from "react";

function SchedulePage() {
    const [schedules, setSchedules] = useState([
        {
            id: 1,
            type: "Praktik Klinik",
            day: "Senin",
            time: "08:00 - 12:00",
            location: "Ruang Praktik 1",
            status: "Aktif",
        },
        {
            id: 2,
            type: "Konsultasi Daring",
            day: "Selasa",
            time: "10:00 - 12:00",
            location: "Online Chat",
            status: "Aktif",
        },
        {
            id: 3,
            type: "Praktik Klinik",
            day: "Rabu",
            time: "13:00 - 16:00",
            location: "Ruang Praktik 1",
            status: "Aktif",
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [selectedDay, setSelectedDay] = useState("Senin");

    const [formData, setFormData] = useState({
        type: "",
        day: "",
        startTime: "",
        endTime: "",
        location: "",
    });

    const weekDays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    const clinicScheduleCount = schedules.filter(
        (schedule) => schedule.type === "Praktik Klinik"
    ).length;

    const onlineScheduleCount = schedules.filter(
        (schedule) => schedule.type === "Konsultasi Daring"
    ).length;

    const selectedDaySchedules = schedules.filter(
        (schedule) => schedule.day === selectedDay
    );

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newSchedule = {
            id: Date.now(),
            type: formData.type,
            day: formData.day,
            time: `${formData.startTime} - ${formData.endTime}`,
            location: formData.location,
            status: "Aktif",
        };

        setSchedules([...schedules, newSchedule]);
        setSelectedDay(formData.day);

        setFormData({
            type: "",
            day: "",
            startTime: "",
            endTime: "",
            location: "",
        });

        setShowForm(false);
    }

    return (
        <section className="p-6">
            <div>
                <h1 className="text-2xl font-semibold text-prima-black">
                    Manajemen Jadwal
                </h1>

                <p className="mt-2 text-sm text-prima-gray">
                    Kelola jadwal praktik dan konsultasi daring dokter dalam tampilan
                    kalender dan daftar jadwal.
                </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-prima-gray">Total Jadwal</p>

                    <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                        {schedules.length}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-prima-gray">Praktik Klinik</p>

                    <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                        {clinicScheduleCount}
                    </h2>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-prima-gray">Konsultasi Daring</p>

                    <h2 className="mt-2 text-3xl font-semibold text-prima-black">
                        {onlineScheduleCount}
                    </h2>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-prima-black">
                                Kalender Jadwal Mingguan
                            </h2>

                            <p className="mt-1 text-sm text-prima-gray">
                                Pilih hari untuk melihat jadwal praktik atau konsultasi.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowForm(!showForm)}
                            className="rounded-xl bg-prima-green px-4 py-2 text-sm font-medium text-white"
                        >
                            {showForm ? "Tutup Form" : "Tambah Jadwal"}
                        </button>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
                        {weekDays.map((day) => {
                            const totalSchedule = schedules.filter(
                                (schedule) => schedule.day === day
                            ).length;

                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={`rounded-2xl border p-4 text-left transition ${selectedDay === day
                                            ? "border-prima-green bg-prima-sand"
                                            : "border-prima-sand bg-white hover:border-prima-green hover:bg-prima-sand"
                                        }`}
                                >
                                    <p className="font-medium text-prima-black">{day}</p>

                                    <p className="mt-2 text-sm text-prima-gray">
                                        {totalSchedule} jadwal
                                    </p>

                                    <div className="mt-3 h-2 rounded-full bg-prima-sand">
                                        <div
                                            className="h-2 rounded-full bg-prima-green"
                                            style={{
                                                width: `${Math.min(totalSchedule * 35, 100)}%`,
                                            }}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {showForm && (
                        <form
                            onSubmit={handleSubmit}
                            className="mt-5 rounded-2xl border border-prima-sand bg-prima-sand p-4"
                        >
                            <h3 className="font-semibold text-prima-black">
                                Form Tambah Jadwal
                            </h3>

                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="text-sm font-medium text-prima-black">
                                        Jenis Jadwal
                                    </label>

                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                    >
                                        <option value="">Pilih jenis jadwal</option>
                                        <option value="Praktik Klinik">Praktik Klinik</option>
                                        <option value="Konsultasi Daring">
                                            Konsultasi Daring
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-prima-black">
                                        Hari
                                    </label>

                                    <select
                                        name="day"
                                        value={formData.day}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                    >
                                        <option value="">Pilih hari</option>
                                        {weekDays.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-prima-black">
                                        Jam Mulai
                                    </label>

                                    <input
                                        type="time"
                                        name="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-prima-black">
                                        Jam Selesai
                                    </label>

                                    <input
                                        type="time"
                                        name="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm font-medium text-prima-black">
                                        Lokasi
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                        className="mt-2 w-full rounded-xl border border-prima-sand bg-white px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                        placeholder="Contoh: Ruang Praktik 1 atau Online Chat"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-prima-green px-5 py-3 text-sm font-medium text-white"
                                >
                                    Simpan Jadwal
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                <aside className="rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Jadwal Hari {selectedDay}
                    </h2>

                    <p className="mt-1 text-sm text-prima-gray">
                        Daftar jadwal berdasarkan hari yang dipilih.
                    </p>

                    <div className="mt-5 space-y-3">
                        {selectedDaySchedules.map((schedule) => (
                            <div
                                key={schedule.id}
                                className="rounded-2xl border border-prima-sand p-4"
                            >
                                <p className="font-medium text-prima-black">
                                    {schedule.type}
                                </p>

                                <p className="mt-1 text-sm text-prima-gray">
                                    {schedule.time}
                                </p>

                                <p className="mt-1 text-sm text-prima-gray">
                                    Lokasi: {schedule.location}
                                </p>

                                <span className="mt-3 inline-block rounded-full bg-prima-sand px-3 py-1 text-xs text-prima-teal">
                                    {schedule.status}
                                </span>
                            </div>
                        ))}

                        {selectedDaySchedules.length === 0 && (
                            <div className="rounded-2xl bg-prima-sand p-4">
                                <p className="text-sm text-prima-gray">
                                    Belum ada jadwal pada hari ini.
                                </p>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-prima-black">
                    Semua Jadwal Dokter
                </h2>

                <p className="mt-1 text-sm text-prima-gray">
                    List gabungan seluruh jadwal praktik dan konsultasi daring.
                </p>

                <div className="mt-5 space-y-3">
                    {schedules.map((schedule) => (
                        <div
                            key={schedule.id}
                            className="rounded-2xl border border-prima-sand p-4"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-medium text-prima-black">
                                        {schedule.type}
                                    </p>

                                    <p className="mt-1 text-sm text-prima-gray">
                                        {schedule.day}, {schedule.time}
                                    </p>

                                    <p className="mt-1 text-sm text-prima-gray">
                                        Lokasi: {schedule.location}
                                    </p>
                                </div>

                                <span className="rounded-full bg-prima-sand px-3 py-1 text-xs text-prima-teal">
                                    {schedule.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SchedulePage;