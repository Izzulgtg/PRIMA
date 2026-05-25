const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-3">

      <div className="flex gap-1 rounded-full bg-white px-4 py-3 shadow-sm">

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary" />

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary delay-100" />

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary delay-200" />

      </div>

      <p className="text-sm text-prima-secondary">
        Dr. Sarah sedang mengetik...
      </p>

    </div>
  )
}

export default TypingIndicator