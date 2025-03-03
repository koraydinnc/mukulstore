"use client"

import { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, Settings, Boxes, Tags, LogOut, Menu, ChevronLeft, PlusCircle, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/adminSlice';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    href: '/admin/dashboard'
  },
  {
    title: 'Ürünler',
    icon: <ShoppingBag className="h-4 w-4" />,
    subItems: [
      {
        title: 'Ürün Ekle',
        href: '/admin/dashboard/products/create-product',
        icon: <PlusCircle className="h-4 w-4" />
      },
      {
        title: 'Ürünler',
        href: '/admin/dashboard/products/list-products',
        icon: <List className="h-4 w-4" />
      }
    ]
  },
  {
    title: 'Kategoriler',
    icon: <Tags className="h-4 w-4" />,
    subItems: [
      {
        title: 'Kategori Ekle',
        href: '/admin/dashboard/category/add-category',
        icon: <PlusCircle className="h-4 w-4" />
      },
      {
        title: 'Kategoriler',
        href: '/admin/dashboard/category/category-list',
        icon: <List className="h-4 w-4" />
      }
    ]
  },
  {
    title: 'Stok',
    icon: <Boxes className="h-4 w-4" />,
    href: '/admin/dashboard/stock'
  },
  {
    title: 'Kullanıcılar',
    icon: <Users className="h-4 w-4" />,
    href: '/admin/dashboard/users'
  },
  {
    title: 'Ayarlar',
    icon: <Settings className="h-4 w-4" />,
    href: '/admin/dashboard/settings'
  }
];

export default function AdminMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      setOpenDropdown(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/admin/login";
  };

  return (
    <aside className={cn("h-screen flex flex-col border-r", collapsed ? "w-16" : "w-64", "transition-all duration-300")}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h2 className="text-lg font-semibold">Admin Panel</h2>}
        <Button variant="ghost" size="icon" onClick={handleCollapse}>
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-auto">
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subItems ? (
                <div>
                  <div
                    className={cn(
                      "flex items-center cursor-pointer rounded-lg px-3 py-2 hover:bg-gray-100",
                      pathname === item.href && "bg-gray-200 text-blue-600"
                    )}
                    onClick={() => handleDropdown(index)}
                  >
                    {item.icon}
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                  {openDropdown === index && (
                    <ul className="ml-6 mt-2 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "flex items-center rounded-lg px-2 py-1 hover:bg-gray-100",
                              pathname === subItem.href && "bg-gray-200 text-blue-600"
                            )}
                          >
                            {subItem.icon}
                            <span className="ml-2">{subItem.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 hover:bg-gray-100",
                    pathname === item.href && "bg-gray-200 text-blue-600"
                  )}
                >
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn("w-full text-red-500 hover:text-red-600 hover:bg-red-50", collapsed && "justify-center")}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Çıkış Yap</span>}
        </Button>
      </div>
    </aside>
  );
}