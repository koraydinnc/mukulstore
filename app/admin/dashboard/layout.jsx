'use client'

import { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AdminMenu from '@/app/components/AdminMenu';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
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

              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Ara..."
                      className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-6 w-6 text-gray-500" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <button className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg">
                  <Image
                    src="/avatar-placeholder.jpg"
                    width={32}
                    height={32}
                    alt="Profile"
                    className="rounded-full"
                  />
                  <span className="hidden md:inline text-sm font-medium">Admin</span>
                </button>
              </div>
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
