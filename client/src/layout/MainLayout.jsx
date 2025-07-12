import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="border-2 border-green">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
