import { useState } from "react";
import { Plus, Send } from "lucide-react";

const ChatInput = ({
  onSend,
  sending = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const trimmedMessage =
      message.trim();

    if (!trimmedMessage) return;

    await onSend(trimmedMessage);

    setMessage("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSubmit();
    }
  };

  return (
    <div className="flex items-center gap-3 border-t border-prima-sand bg-white p-4">

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-prima-sand"
      >
        <Plus className="h-5 w-5 text-prima-secondary" />
      </button>

      <input
        type="text"
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Tulis pesan untuk Dokter..."
        className="flex-1 rounded-full bg-prima-background px-5 py-3 text-sm outline-none"
      />

      <button
        type="button"
        disabled={sending}
        onClick={handleSubmit}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-prima-green text-white transition hover:opacity-90 disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </button>

    </div>
  );
};

export default ChatInput;