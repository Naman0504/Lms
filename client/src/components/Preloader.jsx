import { Loader2 } from "lucide-react";
import React from "react";

const Preloader = () => {
  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Preloader;
