import { useState } from "react";

function ConsultationPage() {
    const consultationQueue = [
        {
            id: 1,
            patientName: "Nadia Putri",
            schedule: "10:00",
            topic: "Konsultasi demam dan pusing",
            status: "Menunggu",
        },
        {
            id: 2,
            patientName: "Agus Saputra",
            schedule: "10:30",
            topic: "Konsultasi batuk dan nyeri tenggorokan",
            status: "Terjadwal",
        },
        {
            id: 3,
            patientName: "Maya Lestari",
            schedule: "11:00",
            topic: "Konsultasi nyeri lambung",
            status: "Terjadwal",
        },
    ];

    const [selectedConsultation, setSelectedConsultation] = useState(null);

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "patient",
            text: "Selamat pagi Dok, saya ingin konsultasi.",
        },
        {
            id: 2,
            sender: "doctor",
            text: "Selamat pagi, silakan ceritakan keluhan yang dirasakan.",
        },
    ]);

    const [newMessage, setNewMessage] = useState("");

    function handleSendMessage(event) {
        event.preventDefault();

        if (!newMessage.trim()) {
            return;
        }

        const message = {
            id: Date.now(),
            sender: "doctor",
            text: newMessage,
        };

        setMessages([...messages, message]);
        setNewMessage("");
    }

    return (
        <section className="p-6">
            <div>
                <h1 className="text-2xl font-semibold text-prima-black">
                    Konsultasi Daring
                </h1>

                <p className="mt-2 text-sm text-prima-gray">
                    Kelola antrian konsultasi daring pasien dan mulai sesi chat sesuai
                    jadwal.
                </p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <aside className="rounded-2xl bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Antrian Konsultasi
                    </h2>

                    <div className="mt-4 space-y-3">
                        {consultationQueue.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setSelectedConsultation(item)}
                                className={`w-full rounded-2xl border p-4 text-left transition ${selectedConsultation?.id === item.id
                                        ? "border-prima-green bg-prima-sand"
                                        : "border-prima-sand hover:border-prima-green hover:bg-prima-sand"
                                    }`}
                            >
                                <p className="font-medium text-prima-black">
                                    {item.patientName}
                                </p>

                                <p className="mt-1 text-sm text-prima-gray">
                                    Jadwal: {item.schedule}
                                </p>

                                <p className="mt-2 text-sm text-prima-black">{item.topic}</p>

                                <span className="mt-3 inline-block rounded-full bg-prima-sand px-3 py-1 text-xs text-prima-teal">
                                    {item.status}
                                </span>
                            </button>
                        ))}
                    </div>
                </aside>

                <div className="rounded-2xl bg-white p-5 shadow-sm lg:col-span-2">
                    <h2 className="text-lg font-semibold text-prima-black">
                        Ruang Chat Konsultasi
                    </h2>

                    <p className="mt-1 text-sm text-prima-gray">
                        Pilih pasien dari antrian untuk memulai sesi konsultasi teks.
                    </p>

                    {!selectedConsultation && (
                        <div className="mt-5 rounded-2xl bg-prima-sand p-4">
                            <p className="text-sm text-prima-gray">
                                Belum ada sesi chat aktif.
                            </p>
                        </div>
                    )}

                    {selectedConsultation && (
                        <div className="mt-5 rounded-2xl bg-prima-sand p-4">
                            <p className="text-sm text-prima-gray">Sesi aktif dengan:</p>

                            <h3 className="mt-1 text-lg font-semibold text-prima-black">
                                {selectedConsultation.patientName}
                            </h3>

                            <p className="mt-2 text-sm text-prima-gray">
                                Jadwal: {selectedConsultation.schedule}
                            </p>

                            <p className="mt-1 text-sm text-prima-black">
                                {selectedConsultation.topic}
                            </p>

                            <div className="mt-5 space-y-3">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === "doctor"
                                                ? "justify-end"
                                                : "justify-start"
                                            }`}
                                    >
                                        <div
                                            className={`max-w-xs rounded-2xl px-4 py-3 text-sm ${message.sender === "doctor"
                                                    ? "bg-prima-green text-white"
                                                    : "bg-white text-prima-black"
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSendMessage} className="mt-5 flex gap-3">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(event) => setNewMessage(event.target.value)}
                                    className="flex-1 rounded-xl border border-prima-sand px-4 py-3 text-sm text-prima-black outline-none focus:border-prima-green"
                                    placeholder="Tulis balasan dokter..."
                                />

                                <button
                                    type="submit"
                                    className="rounded-xl bg-prima-green px-5 py-3 text-sm font-medium text-white"
                                >
                                    Kirim
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default ConsultationPage;