function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        h-16
        px-6
        rounded-2xl
        bg-white
        border
        border-prima-sand
        outline-none
        text-lg
      "
    />
  )
}

export default Input