import { useState } from "react";
import { X } from "lucide-react";

function ConsultationChatPage() {
  const [messages, setMessages] =
    useState([
      {
        id: 1,
        sender: "patient",
        time: "10:02",
        text: "Selamat siang dokter, nyeri di perut saya rasanya perih sekali seperti ditusuk-tusuk.",
      },
      {
        id: 2,
        sender: "doctor",
        time: "10:03",
        text: "Selamat siang Bu Siti. Apakah rasa perihnya muncul setiap saat atau hanya setelah makan saja?",
      },
      {
        id: 3,
        sender: "patient",
        time: "10:05",
        text: "Terutama setelah makan pedas atau kopi dok. Tadi pagi saya minum kopi lalu langsung perih.",
      },
    ]);

  const [inputText, setInputText] =
    useState("");

  const [prescriptions, setPrescriptions] =
    useState([
      {
        id: 1,
        name: "Omeprazole",
        dose: "1x1 Sebelum Makan",
      },
      {
        id: 2,
        name: "Sucralfate",
        dose: "3x1 Sendok Makan",
      },
    ]);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          sender: "doctor",
          time: "10:15",
          text: inputText,
        },
      ]);

      setInputText("");
    }
  };

  const handleRemovePrescription = (
    id
  ) => {
    setPrescriptions(
      prescriptions.filter(
        (p) => p.id !== id
      )
    );
  };

  return (
    <div className="mx-auto my-4 flex max-w-[1050px] gap-4">

      {/* semua kode lama tetap */}

      <div className="flex flex-col gap-1">

        {prescriptions.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded bg-gray-200 p-2"
          >

            <span>
              {p.name} • {p.dose}
            </span>

            <button
              onClick={() =>
                handleRemovePrescription(
                  p.id
                )
              }
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ConsultationChatPage;