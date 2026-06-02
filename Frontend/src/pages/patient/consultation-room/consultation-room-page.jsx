import {
  useEffect,
  useRef,
  useState,
} from "react";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ChatBubble from "@/components/patient/consultation/chat-bubble";
import ChatInput from "@/components/patient/consultation/chat-input";
import TypingIndicator from "@/components/patient/consultation/typing-indicator";

import { dummyMessages } from "@/data/dummy-chat-messages";
import { dummyConsultationSession } from "@/data/dummy-consultation-session";

function ConsultationRoomPage() {
  const navigate = useNavigate();

  const [messages, setMessages] =
    useState(dummyMessages);

  const [sending, setSending] =
    useState(false);

  const [remainingSeconds, setRemainingSeconds] =
    useState(
      dummyConsultationSession.duration
    );

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) =>
        prev > 0 ? prev - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  const sendMessage = async (
    text
  ) => {
    if (!text?.trim()) return;

    setSending(true);

    const newMessage = {
      id: Date.now(),
      sender: "patient",
      message: text,
      time: new Date().toLocaleTimeString(
        "id-ID",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "doctor",
          message:
            "Baik, informasi Anda sudah saya terima. Mohon jelaskan lebih detail mengenai keluhan yang dirasakan.",
          time: new Date().toLocaleTimeString(
            "id-ID",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        },
      ]);

      setSending(false);
    }, 1500);
  };

  const minutes = Math.floor(
    remainingSeconds / 60
  );

  const seconds =
    remainingSeconds % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-6">

      {/* HEADER */}
      <section className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm">

        <div className="flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                navigate(
                  "/patient/waiting-room"
                )
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-prima-background
                transition
                hover:bg-prima-sand
              "
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-prima-green font-bold text-white">
              {
                dummyConsultationSession.doctorCode
              }
            </div>

            <div>

              <h2 className="text-2xl font-bold text-prima-text">
                {
                  dummyConsultationSession.doctorName
                }
              </h2>

              <div className="mt-1 flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />

                <p className="text-sm text-prima-secondary">
                  {
                    dummyConsultationSession.specialization
                  }
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="text-right">

            <p className="text-sm text-prima-secondary">
              Session Time
            </p>

            <h3 className="mt-1 text-2xl font-bold text-red-500">
              {formattedTime}
            </h3>

            <button
              onClick={() =>
                navigate(
                  "/patient/consultation"
                )
              }
              className="
                mt-3
                rounded-xl
                bg-red-500
                px-4
                py-2
                text-sm
                font-medium
                text-white
                transition
                hover:bg-red-600
              "
            >
              Akhiri Konsultasi
            </button>

          </div>

        </div>

      </section>

      {/* CHAT AREA */}
      <section className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-[#F1ECE4] bg-prima-card shadow-sm">

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto bg-prima-background p-6 space-y-6">

          <div className="flex justify-center">

            <span className="rounded-full bg-prima-sand px-4 py-2 text-sm text-prima-secondary">
              Consultation Started
            </span>

          </div>

          {messages.map(
            (message) => (
              <ChatBubble
                key={message.id}
                sender={message.sender}
                message={message.message}
                time={message.time}
              />
            )
          )}

          <TypingIndicator
            doctorName={
              dummyConsultationSession.doctorName
            }
            visible={sending}
          />

          <div ref={chatEndRef} />

        </div>

        {/* INPUT */}
        <ChatInput
          onSend={sendMessage}
          sending={sending}
        />

      </section>

    </div>
  );
}

export default ConsultationRoomPage;