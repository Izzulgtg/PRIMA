function Input({
  type = "text",
  placeholder,
}) {
  return (
  <input
    type={type}
    placeholder={placeholder}
    className="
      w-full
      px-4
      py-3
      rounded-xl
      border
      border-prima-sand
      bg-white
      text-prima-text
      placeholder:text-prima-muted

      focus:outline-none
      focus:ring-2
      focus:ring-prima-green
      focus:border-prima-green

      transition-all
      duration-200
    "
  />
)
}

export default Input