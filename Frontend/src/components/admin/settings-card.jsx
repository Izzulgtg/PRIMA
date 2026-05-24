function SettingsCard({
  title,
  children,
  action,
}) {
  return (
    <div
      className="
        bg-white
        rounded-[28px]
        border
        border-prima-sand
        p-8
        shadow-sm
      "
    >

      {/* HEADER */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-8
        "
      >

        <h2
          className="
            text-2xl
            font-semibold
            text-prima-text
          "
        >
          {title}
        </h2>

        {action}

      </div>

      {/* CONTENT */}
      {children}

    </div>
  )
}

export default SettingsCard