import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import ChatBubble from "@/components/patient/consultation/chat-bubble";
import ChatInput from "@/components/patient/consultation/chat-input";

import {
  getMessages,
  getSessionDetail,
  sendMessage as sendMessageApi,
  finishConsultation,
} from "@/services/patient/consultation-service";

function ConsultationRoomPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const chatEndRef = useRef(null);

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [messages, setMessages] =
    useState([]);

  const [session, setSession] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [remainingSeconds, setRemainingSeconds] =
    useState(1800);

  /*
  |------------------------------------------------------------------
  | LOAD SESSION
  |------------------------------------------------------------------
  */

  const loadSession = async () => {
    try {
      const data =
        await getSessionDetail(sessionId);

      setSession(data);
    } catch (error) {
      console.error(
        "Load session error:",
        error
      );
    }
  };

  /*
  |------------------------------------------------------------------
  | LOAD MESSAGES
  |------------------------------------------------------------------
  */

  const loadMessages = async () => {
    try {
      const data =
        await getMessages(sessionId);

      setMessages(data || []);
    } catch (error) {
      console.error(
        "Load messages error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  |------------------------------------------------------------------
  | INITIAL LOAD
  |------------------------------------------------------------------
  */

  const loadInitialData =
    async () => {
      await Promise.all([
        loadSession(),
        loadMessages(),
      ]);
    };

  /*
  |------------------------------------------------------------------
  | FIRST LOAD + POLLING
  |------------------------------------------------------------------
  */

  useEffect(() => {
    loadInitialData();

    const interval =
      setInterval(() => {
        loadMessages();
        loadSession();
      }, 5000);

    return () =>
      clearInterval(interval);
  }, [sessionId]);

  /*
  |------------------------------------------------------------------
  | SET TIMER FROM DATABASE
  |------------------------------------------------------------------
  */

  const timerInitialized = useRef(false);
  useEffect(() => {
    if (
      !session?.durasi_menit ||
      timerInitialized.current
    ) {
      return;
    }

    setRemainingSeconds(
      session.durasi_menit * 60
    );

    timerInitialized.current = true;
  }, [session]);

  /*
  |------------------------------------------------------------------
  | STATUS CHECK
  |------------------------------------------------------------------
  */

  useEffect(() => {
    if (!session) return;

    if (
      session.status ===
      "menunggu"
    ) {
      navigate(
        "/patient/waiting-room"
      );
    }
    if (
      session.status ===
      "selesai"
    ) {
      navigate(
        "/patient/consultation"
      );
    }
  }, [session, navigate]);

  /*
  |------------------------------------------------------------------
  | AUTO SCROLL
  |------------------------------------------------------------------
  */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  /*
  |------------------------------------------------------------------
  | TIMER COUNTDOWN
  |------------------------------------------------------------------
  */

  useEffect(() => {
    const timer =
      setInterval(() => {
        setRemainingSeconds(
          (prev) =>
            prev > 0
              ? prev - 1
              : 0
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  /*
  |------------------------------------------------------------------
  | SEND MESSAGE
  |------------------------------------------------------------------
  */

  const handleSendMessage =
    async (text) => {
      if (!text?.trim())
        return;

      try {
        setSending(true);

        await sendMessageApi(
          sessionId,
          text
        );

        await loadMessages();
      } catch (error) {
        console.error(
          "Send message error:",
          error
        );
      } finally {
        setSending(false);
      }
    };

  /*
  |------------------------------------------------------------------
  | FINISH CONSULTATION
  |------------------------------------------------------------------
  */

  const handleFinishConsultation =
    async () => {
      try {
        await finishConsultation(
          sessionId
        );

        navigate(
          "/patient/consultation"
        );
      } catch (error) {
        console.error(
          "Finish consultation error:",
          error
        );
      }
    };

  /*
  |------------------------------------------------------------------
  | HELPERS
  |------------------------------------------------------------------
  */

  const formatMessageTime = (
    dateString
  ) => {
    return new Date(
      dateString
    ).toLocaleTimeString(
      "id-ID",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const minutes =
    Math.floor(
      remainingSeconds / 60
    );

  const seconds =
    remainingSeconds % 60;

  const formattedTime = `${String(
    minutes
  ).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const doctorInitial =
    session?.dokter_nama
      ?.charAt(0)
      ?.toUpperCase() || "D";

  /*
  |------------------------------------------------------------------
  | LOADING
  |------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-prima-secondary">
          Memuat percakapan...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col gap-6">

      {/* HEADER */}
      <section className="rounded-[32px] border border-[#F1ECE4] bg-prima-card p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                navigate(
                  "/patient/consultation"
                )
              }
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                bg-prima-background
                transition
                hover:bg-prima-sand
              "
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-prima-green font-bold text-white">
              {doctorInitial}
            </div>

            <div>

              <h2 className="text-2xl font-bold text-prima-text">
                {session?.dokter_nama ||
                  "Konsultasi Online"}
              </h2>

              <div className="mt-1 flex items-center gap-2">

                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                <p className="text-sm capitalize text-prima-secondary">
                  {session?.status ||
                    "berlangsung"}
                </p>

              </div>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-prima-secondary">
              Session Time
            </p>

            <h3 className="mt-1 text-2xl font-bold text-red-500">
              {formattedTime}
            </h3>

            <button
              onClick={
                handleFinishConsultation
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

      {/* CHAT */}
      <section className="flex flex-1 flex-col overflow-hidden rounded-[32px] border border-[#F1ECE4] bg-prima-card shadow-sm">

        <div className="flex-1 space-y-6 overflow-y-auto bg-prima-background p-6">

          <div className="flex justify-center">

            <span className="rounded-full bg-prima-sand px-4 py-2 text-sm text-prima-secondary">
              Consultation Started
            </span>

          </div>

          {messages.map(
            (message) => (
              <ChatBubble
                key={message.id}
                sender={
                  message.pengirim_id ===
                  currentUser.id
                    ? "patient"
                    : "doctor"
                }
                message={
                  message.isi
                }
                time={formatMessageTime(
                  message.created_at
                )}
              />
            )
          )}

          <div ref={chatEndRef} />

        </div>

        <ChatInput
          onSend={
            handleSendMessage
          }
          sending={sending}
        />

      </section>

    </div>
  );
}

export default ConsultationRoomPage;