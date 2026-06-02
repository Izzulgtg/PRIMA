import { useCallback, useState } from "react";

import usePolling from "./usePolling";

import {
  getMessages,
  sendMessage,
} from "@/services/patient/consultation-service";

const usePatientChat = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    if (!sessionId) return;

    try {
      const data = await getMessages(sessionId);

      setMessages(data);
      setError(null);
    } catch (err) {
      console.error(err);

      setError("Gagal mengambil pesan");
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  const handleSendMessage = async (
    messageText
  ) => {
    if (!messageText?.trim()) return;

    try {
      setSending(true);

      await sendMessage(
        sessionId,
        messageText
      );

      await fetchMessages();
    } catch (err) {
      console.error(err);

      setError("Gagal mengirim pesan");
    } finally {
      setSending(false);
    }
  };

  usePolling(fetchMessages, 3000);

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage: handleSendMessage,
    refreshMessages: fetchMessages,
  };
};

export default usePatientChat;