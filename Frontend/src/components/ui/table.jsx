function Table({ children }) {
  return (
  <div className="overflow-x-auto">

    <table
      className="
        w-full
        border-collapse
      "
    >
      {children}
    </table>

  </div>
)
}

export default Table