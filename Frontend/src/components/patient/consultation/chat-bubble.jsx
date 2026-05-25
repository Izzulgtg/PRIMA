const ChatBubble = ({
  sender,
  message,
  time,
}) => {
  const isPatient = sender === 'patient'

  return (
    <div
      className={`flex ${
        isPatient ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="max-w-xl">

        <div
          className={`rounded-3xl px-5 py-4 text-sm leading-relaxed shadow-sm ${
            isPatient
              ? 'bg-prima-green text-white'
              : 'bg-white text-prima-text'
          }`}
        >
          {message}
        </div>

        <p
          className={`mt-2 text-xs text-prima-secondary ${
            isPatient ? 'text-right' : 'text-left'
          }`}
        >
          {time}
        </p>

      </div>
    </div>
  )
}

export default ChatBubble