import React, { useState } from "react";
import { FaBars, FaBell, FaUser } from "react-icons/fa";

const AdminTopbar = ({ setMobileOpen }) => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="md:hidden z-10 flex items-center justify-between px-12 py-3 text-white fixed top-0 w-full">
      {/* menu button */}
      <button onClick={() => setMobileOpen(true)}>
        <FaBars size={22} />
      </button>

      {/* right icons */}
      <div className="flex items-center gap-5">
        <FaBell size={20} className="text-green-400" />

        {/* user dropdown */}
        <div className="relative">
          <FaUser
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="absolute top-[100%] right-0 mt-3 bg-slate-800 border border-slate-700 rounded shadow-xl px-5 py-3">
              <p className="mb-2">{user?.name}</p>

              <button
                className="text-red-400"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
