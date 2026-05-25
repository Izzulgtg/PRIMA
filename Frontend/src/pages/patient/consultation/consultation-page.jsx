import {
  ArrowLeft,
  MessageSquare,
  Clock3,
  CalendarPlus,
} from 'lucide-react'

import ConsultationStatusCard from '@/components/patient/consultation/consultation-status-card'
import ChatBubble from '@/components/patient/consultation/chat-bubble'
import ChatInput from '@/components/patient/consultation/chat-input'
import TypingIndicator from '@/components/patient/consultation/typing-indicator'

const ConsultationPage = () => {
  return (
    <div className="min-h-screen bg-prima-background p-6">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">

        <button className="rounded-full bg-white p-3 shadow-sm">
          <ArrowLeft className="h-5 w-5 text-prima-text" />
        </button>

        <h1 className="text-2xl font-semibold text-prima-text">
          Konsultasi Daring
        </h1>

      </div>

      {/* STATUS SECTION */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        <ConsultationStatusCard
          title="Dalam 15 Menit"
          subtitle="Sesi Konsultasi"
          doctor="Dr. Sarah Johnson, Sp.PD"
          time="14:55"
          actionText="Menunggu Antrean"
          background="bg-[#356D83]"
          buttonColor="bg-white text-[#356D83]"
          icon={<MessageSquare className="h-5 w-5" />}
        />

        <ConsultationStatusCard
          title="Segera Dimulai"
          subtitle="Masuk Ruang Tunggu"
          doctor="Dokter sudah bersiap"
          time="04:59"
          actionText="Masuk Ruang Chat"
          background="bg-[#F3D6B3]"
          buttonColor="bg-orange-500 text-white"
          icon={<Clock3 className="h-5 w-5 text-orange-700" />}
        />

        <ConsultationStatusCard
          title="Waktunya Dimulai"
          subtitle="Mulai Sekarang"
          doctor="Sesi Anda telah dimulai"
          time="00:00"
          actionText="Masuk Ruang Chat Sekarang"
          background="bg-prima-green"
          buttonColor="bg-white text-prima-green"
          icon={<CalendarPlus className="h-5 w-5" />}
        />

      </div>

      {/* CHAT SECTION */}
      <div className="mt-8 overflow-hidden rounded-[32px] bg-prima-sand shadow-sm">

        {/* TOP CHAT */}
        <div className="border-b border-white bg-[#F7F5EF] p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Doctor"
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>

                <h3 className="text-lg font-semibold text-prima-text">
                  Dr. Dila, Sp.PD
                </h3>

                <p className="text-sm text-green-600">
                  ● Online • Sedang Aktif
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-prima-secondary">
                WAKTU SISA
              </p>

              <p className="text-lg font-semibold text-red-500">
                29:45
              </p>

              <button className="mt-2 rounded-xl border border-red-400 px-4 py-2 text-sm text-red-500">
                Akhiri Sesi
              </button>

            </div>

          </div>

        </div>

        {/* CHAT BODY */}
        <div className="space-y-6 bg-[#ECE7DD] p-6">

          <div className="flex justify-center">
            <span className="rounded-full bg-[#D9D3C8] px-4 py-2 text-sm text-prima-secondary">
              Sesi Konsultasi Dimulai Pukul 10:00 AM
            </span>
          </div>

          <ChatBubble
            sender="doctor"
            message="Selamat pagi Ibu Amelia. Saya dr. Sarah yang akan membantu Anda hari ini. Apa saja keluhan yang Ibu rasakan?"
            time="10:01 AM"
          />

          <ChatBubble
            sender="patient"
            message="Selamat pagi Dokter. Saya merasa pusing dan mual sejak tadi malam, Dok. Rasanya seperti berputar-putar."
            time="10:02 AM"
          />

          <ChatBubble
            sender="doctor"
            message="Baik, apakah ada gejala lain seperti demam atau nyeri perut? Dan apakah Ibu sudah meminum obat sebelumnya?"
            time="10:03 AM"
          />

          <TypingIndicator />

        </div>

        {/* INPUT */}
        <ChatInput />

      </div>

      {/* FOOTER */}
      <footer className="mt-10 flex flex-col gap-4 text-sm text-prima-secondary md:flex-row md:items-center md:justify-between">

        <p>
          © 2024 Gentle Care Medical. All rights reserved.
        </p>

        <div className="flex gap-5">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
          <button>Contact Support</button>
        </div>

      </footer>

    </div>
  )
}

export default ConsultationPage