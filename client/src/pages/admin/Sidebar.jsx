import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full mt-0">
      <div className="w-full h-fit sm:w-[250px] space-y-8 border-gray-300 dark:border-gray-700 bg-gradient-to-b from-yellow-100 via-green-100 to-green-200 p-5 sticky top-0 md:h-screen">
        {/* <div className="space-y-4 mt-4">
          <Link to="dashboard" className="flex items-center gap-2 ">
            <ChartNoAxesColumn size={24}/>
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={24} />
            <h1>Add Courses</h1>
          </Link>
        </div> */}
        <div className="space-x-4 space-y-1 md:space-y-4 mt-4 flex flex-row items-center md:flex-col">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive
                  ? "bg-[rgba(34,197,94,0.060)] font-semibold"
                  : "text-black"
              }`
            }
          >
            <ChartNoAxesColumn size={24} />
            <h1>Dashboard</h1>
          </NavLink>

          <NavLink
            to="course"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded ${
                isActive
                  ? "bg-[rgba(34,197,94,0.060)] font-semibold"
                  : "text-black"
              }`
            }
          >
            <SquareLibrary size={24} />
            <h1>Add Courses</h1>
          </NavLink>
 
        </div>
      </div>
      <div className="flex-1 p-3 md:p-10 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
