'use client'

import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AdminMenu from '@/app/components/AdminMenu';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen  flex">
      {/* AdminMenu */}
      <AdminMenu />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Image src="/logo.png" width={32} height={32} alt="Logo" className="bg-black rounded-lg" />
                <span className="self-center text-xl font-semibold">Admin Panel</span>
              </Link>

            
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-4">
          <div className="p-4 rounded-lg bg-white shadow-sm min-h-[calc(100vh-6rem)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
