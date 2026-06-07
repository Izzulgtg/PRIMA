import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  return (
    <header className="bg-white border-b border-[#EDE8DC] px-6 py-4 flex items-center justify-between">
    <>
    <h1 className="text-xl font-semibold text-[#1E1E1E]">
        Admin Panel
    </h1>

    <div className="flex items-center gap-4">

        <div className="bg-[#EDE8DC] px-3 py-1 rounded-full">
        <p className="text-sm font-medium text-[#6B8F71]">
            Admin
        </p>
        </div>
<div
  onClick={() =>
    navigate("/admin/profile")
  }
  className="
    w-10 h-10
    rounded-full
    bg-[#6B8F71]
    flex
    items-center
    justify-center
    text-white
    font-semibold
    cursor-pointer
  "
>
  {user?.nama_lengkap?.charAt(0)}
</div>

    </div>
    </>
    </header>
  )
}

export default Navbar   