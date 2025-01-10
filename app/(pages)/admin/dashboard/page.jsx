"use client"

import { useState } from 'react'
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
  ]

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Yönetim Panel</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Yeni Ürün Ekle
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg">
            Rapor Oluştur
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.trend} geçen aya göre
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Satış Grafiği</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add your chart component here */}
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
            <div className="space-y-4">
              {/* Recent orders table */}
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th>Sipariş ID</th>
                    <th>Müşteri</th>
                    <th>Tutar</th>
                    <th>Durum</th>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Düşük Stok Uyarıları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Low stock alerts */}
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
            <div className="space-y-4">
              {/* Top selling products */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}