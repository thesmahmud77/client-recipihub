import DeshboardAvater from "@/Components/Deshboard/DeshboardAvater";
import DeshboardSidebar from "@/Components/Deshboard/DeshboardSidebar";
import React from "react";

const DeshboardLayout = ({ children }) => {
  return (
    <div className="flex items-start justify-between min-h-screen w-full max-w-7xl gap-10">
      <div className=" col-span-2 max-w-7xl mx-auto flex flex-col gap-5 px-10 items-center justify-start">
        <DeshboardAvater></DeshboardAvater>
        <DeshboardSidebar></DeshboardSidebar>
      </div>
      <main className="w-full flex items-start justify-center col-span-10">
        {children}
      </main>
    </div>
  );
};

export default DeshboardLayout;
