"use client";

import AdminMenu from "@/app/components/AdminMenu";
import { Toaster } from "@/components/ui/toaster";
import { useSelector } from "react-redux";

export default function AdminLayoutClient({ children }) {
  const auth = useSelector((state) => state.admin);

  return (
    <div className="flex min-h-screen">
      <div className="w-64">
        {auth.isAuthenticated && <AdminMenu />}
      </div>
      
      <div className="flex-1 p-6 space-y-8">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
