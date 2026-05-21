function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
if (!isOpen) return null
 return (
  <div
    className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-white
        rounded-2xl
        p-6
        w-full
        max-w-lg
        shadow-lg
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-semibold text-[#1E1E1E]">
          {title}
        </h2>

        <button
          onClick={onClose}
          className="
            text-[#6B7280]
            hover:text-[#1E1E1E]
            cursor-pointer
          "
        >
          ✕
        </button>

      </div>

      {children}

    </div>

  </div>
)
}

export default Modal