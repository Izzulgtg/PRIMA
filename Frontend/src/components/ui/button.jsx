function Button({
  children,
  variant = "primary",
  onClick,
}) {

  const variants = {

    primary:
      "bg-prima-green text-white hover:opacity-90",

    secondary:
      "bg-prima-teal text-white hover:opacity-90",

    danger:
      "bg-[#D98C6B] text-white hover:opacity-90",

    outline:
      "border border-prima-green text-prima-green bg-transparent hover:bg-prima-green hover:text-white",

  }

  return (
    <button
      onClick={onClick}
      className={`
        px-6
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-200
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button