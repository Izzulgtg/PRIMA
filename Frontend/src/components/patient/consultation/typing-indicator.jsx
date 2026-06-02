const TypingIndicator = ({
  doctorName = "Dr. Sarah Johnson",
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <div className="flex items-center gap-3">

      <div className="flex gap-1 rounded-full bg-white px-4 py-3 shadow-sm">

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary" />

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary [animation-delay:150ms]" />

        <div className="h-2 w-2 animate-bounce rounded-full bg-prima-secondary [animation-delay:300ms]" />

      </div>

      <p className="text-sm text-prima-secondary">
        {doctorName} sedang mengetik...
      </p>

    </div>
  );
};

export default TypingIndicator;