function Badge({
  children,
  variant = "success",
}) {


const variants = {
  success:
    "bg-[#DDEADF] text-[#6B8F71]",

  warning:
    "bg-[#F3E1D8] text-[#C4846A]",

  danger:
    "bg-[#F8D7DA] text-[#842029]",

  info:
    "bg-[#D9EAF0] text-[#4A7C8E]",
}    
  return (
    <span
  className={`
    inline-flex
    items-center
    px-3
    py-1
    rounded-full
    text-sm
    font-medium

    ${variants[variant]}
  `}
>
      {children}
    </span>
  )
}

export default Badge