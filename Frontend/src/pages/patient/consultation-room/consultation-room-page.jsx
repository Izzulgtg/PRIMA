import {
  ArrowLeft,
} from "lucide-react"

import { useNavigate } from "react-router-dom"

import ChatBubble from "@/components/patient/consultation/chat-bubble"
import ChatInput from "@/components/patient/consultation/chat-input"
import TypingIndicator from "@/components/patient/consultation/typing-indicator"

function ConsultationRoomPage() {

  const navigate = useNavigate()

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">

      {/* HEADER */}
      <section className="bg-prima-card rounded-[32px] p-6 border border-[#F1ECE4] shadow-sm">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate("/patient/consultation")}
              className="w-12 h-12 rounded-2xl bg-prima-background flex items-center justify-center hover:bg-prima-sand transition-all duration-300"
            >

              <ArrowLeft size={20} />

            </button>

            <div className="w-14 h-14 rounded-full bg-prima-green flex items-center justify-center text-white font-bold">
              DR
            </div>

            <div>

              <h2 className="text-2xl font-bold text-prima-text">
                Dr. Sarah Johnson
              </h2>

              <div className="flex items-center gap-2 mt-1">

                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>

                <p className="text-sm text-prima-secondary">
                  Online Consultation Active
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="text-right">

            <p className="text-sm text-prima-secondary">
              Session Time
            </p>

            <h3 className="text-2xl font-bold text-red-500 mt-1">
              29:45
            </h3>

          </div>

        </div>

      </section>

      {/* CHAT AREA */}
      <section className="flex-1 bg-prima-card rounded-[32px] border border-[#F1ECE4] shadow-sm flex flex-col overflow-hidden">

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto p-6 bg-prima-background space-y-6">

          <div className="flex justify-center">

            <span className="bg-prima-sand text-prima-secondary px-4 py-2 rounded-full text-sm">
              Consultation Started at 10:00 AM
            </span>

          </div>

          <ChatBubble
            sender="doctor"
            message="Selamat pagi. Apa keluhan yang sedang Anda rasakan hari ini?"
            time="10:01 AM"
          />

          <ChatBubble
            sender="patient"
            message="Saya mengalami sakit kepala dan tubuh terasa lemas dok."
            time="10:02 AM"
          />

          <ChatBubble
            sender="doctor"
            message="Apakah ada demam atau gangguan tidur sebelumnya?"
            time="10:03 AM"
          />

          <TypingIndicator />

        </div>

        {/* INPUT */}
        <ChatInput />

      </section>

    </div>
  )
}

export default ConsultationRoomPage