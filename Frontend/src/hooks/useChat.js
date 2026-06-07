import { useState, useEffect, useRef } from "react";

export default function useChat(patientId) {
  const [messages, setMessages] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!patientId) return;

    const fetchMessages = () => {
      setMessages([
        { sender: "patient", content: "Selamat siang dokter, nyeri di perut saya rasanya perih sekali seperti ditusuk-tusuk.", time: "10:02" },
        { sender: "doctor", content: "Selamat siang Bu Siti. Apakah rasa perihnya muncul setiap saat atau hanya setelah makan saja?", time: "10:03" },
        { sender: "patient", content: "Terutama setelah makan pedas atau kopi dok. Tadi pagi saya minum kopi lalu langsung perih.", time: "10:05" },
        { sender: "doctor", content: "Baik, nanti saya buatkan resep elektronik untuk terapi.", time: "10:15" },
      ]);
    };

    fetchMessages();
    intervalRef.current = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalRef.current);
  }, [patientId]);

  const sendMessage = (text) => {
    if (!text) return;
    setMessages((prev) => [...prev, { sender: "doctor", content: text, time: new Date().toLocaleTimeString().slice(0,5) }]);
  };

  return { messages, sendMessage, loading: false };
}