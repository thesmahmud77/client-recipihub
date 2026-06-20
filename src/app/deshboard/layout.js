import DeshboardSidebar from "@/Components/Deshboard/DeshboardSidebar";
import React from "react";

const DeshboardLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-between min-h-screen w-full">
      <div className="flex flex-col items-center justify-center">
        <DeshboardSidebar></DeshboardSidebar>
      </div>
      <main className="p-5">{children}</main>
    </div>
  );
};

export default DeshboardLayout;
