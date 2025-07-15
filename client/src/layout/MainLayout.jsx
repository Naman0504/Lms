import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="h-full w-full">
        <Navbar />
        <div className="h-full md:h-full">
          <Outlet />
        </div>
      <Footer />
      </div>
    </>
  );
};

export default MainLayout;
