import DeshboardSidebar from "@/Components/Deshboard/DeshboardSidebar";
import React from "react";

const DeshboardLayout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 min-h-screen w-full">
      <div className=" col-span-2 max-w-7xl mx-auto flex items-start justify-start">
        <DeshboardSidebar></DeshboardSidebar>
      </div>
      <main className="w-full bg-orange-500 col-span-10">{children}</main>
    </div>
  );
};

export default DeshboardLayout;
