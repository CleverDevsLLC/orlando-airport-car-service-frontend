import Navbar from "@/Components/Common/Navbar/Navbar";
import React from "react";

interface ILayout {
  children: React.ReactNode;
}
export default function Layout({ children }: ILayout) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
