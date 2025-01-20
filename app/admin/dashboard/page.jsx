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
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-4 sm:p-6 space-y-8">
        {/* Başlık */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Yönetim Panel</h1>
        </div>
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
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

        {/* Grafik ve Son Siparişler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Satış Grafiği</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {/* Chart placeholder */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Son Siparişler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="whitespace-nowrap">Sipariş ID</th>
                      <th className="whitespace-nowrap">Müşteri</th>
                      <th className="whitespace-nowrap">Tutar</th>
                      <th className="whitespace-nowrap">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Add your order rows here */}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stok Uyarıları ve En Çok Satan Ürünler */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Düşük Stok Uyarıları</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-500">
                  <AlertTriangle size={20} />
                  <span>5 ürün kritik stok seviyesinde</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>En Çok Satan Ürünler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">{/* Top selling products */}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
