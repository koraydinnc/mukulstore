"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AdminMenu from "@/app/components/AdminMenu";
import SaleCharts from "../components/Charts/SaleCharts";

export default function DashboardPage() {
  const stats = [
    {
      title: "Toplam Satış",
      value: "₺45,231.89",
      icon: <DollarSign />,
      trend: "+12%",
    },
    {
      title: "Aktif Kullanıcılar",
      value: "2,345",
      icon: <Users />,
      trend: "+5%",
    },
    {
      title: "Toplam Sipariş",
      value: "1,234",
      icon: <ShoppingBag />,
      trend: "+18%",
    },
    {
      title: "Stok Durumu",
      value: "789",
      icon: <Package />,
      trend: "-2%",
    },
  ];

  return (
    <div className="flex h-min-screen  ">
      <div className="flex-1 sm:p-6">
        {/* Başlık */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Yönetim Paneli</h1>
        </div>
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-md rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={`text-xs ${
                    stat.trend.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.trend} geçen aya göre
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <SaleCharts />
        </div>

     
        

    
      </div>
    </div>
  );
}