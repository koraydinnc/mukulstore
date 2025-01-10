"use client";

import { useSelector } from "react-redux";
import AdminMenu from "@/app/components/AdminMenu";
import { Toaster } from "@/components/ui/toaster";

export default function AdminLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.admin); // Redux state'e erişim

  return (
    <div className="flex min-h-screen">
      {isAuthenticated && <AdminMenu />}
      <main className="flex-1 p-8">{children}</main>
      <Toaster />
    </div>
  );
}
