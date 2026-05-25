import { Plus, Send } from 'lucide-react'

const ChatInput = () => {
  return (
    <div className="flex items-center gap-3 border-t border-prima-sand bg-white p-4">

      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-prima-sand">
        <Plus className="h-5 w-5 text-prima-secondary" />
      </button>

      <input
        type="text"
        placeholder="Tulis pesan untuk Dokter..."
        className="flex-1 rounded-full bg-prima-background px-5 py-3 text-sm outline-none"
      />

      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-prima-green text-white transition hover:opacity-90">

        <Send className="h-5 w-5" />

      </button>

    </div>
  )
}

export default ChatInput