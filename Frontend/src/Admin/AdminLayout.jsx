import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
// import AdminTopbar from "./AdminTopbar";
import AdminTopBar from "./AdminTopBar";
const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen  bg-slate-50 items-center justify-center w-full ">
      {/* SIDEBAR */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* CONTENT AREA */}
      <div
        className={`flex-1 transition-all duration-300 w-full
          ${collapsed ? "ml-20" : "ml-64"}
          max-md:ml-0
        `}
      >
        {/* TOP BAR for mobile */}
        <AdminTopBar setMobileOpen={setMobileOpen} />

        {/* Pages */}
        <div className="max-md:px-4 max-md:py-16 lg:px-4 lg:py-4 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import AdminTopbar from "./AdminTopBar";

// const AdminLayout = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-slate-800 w-full overflow-hidden">
//       <AdminSidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       {/* content always full width below lg */}
//       <div
//         className={`flex-1 transition-all duration-300 w-full
//           lg:ml-${collapsed ? "20" : "64"}
//         `}
//       >
//         <AdminTopbar setMobileOpen={setMobileOpen} />

//         <div className="px-4 py-16 lg:px-4 lg:py-4 w-full">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
