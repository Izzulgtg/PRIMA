function Button({
  children,
  variant = "primary",
  onClick,  
}) {

  const variants = {
    primary:
      "bg-prima-green text-white hover:opacity-90",

    secondary:
      "bg-[#4A7C8E] text-white hover:opacity-90",

    danger:
      "bg-[#C4846A] text-white hover:opacity-90",

    outline:
      "border border-[#6B8F71] text-prima-green hover:bg-prima-sand",
  }

  return (
    <button
      className={`
        px-5
        py-2.5
        rounded-xl
        font-medium
        transition-all
        duration-200
        cursor-pointer

        ${variants[variant]}
      `}
    >
      {children}
    </button>
  )
}

export default Button