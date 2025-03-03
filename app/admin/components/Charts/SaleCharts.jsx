import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Card } from 'antd';

const { Title } = Typography;

const SaleCharts = () => {
  const data = [
    { product: 'Ürün 1', sales: 150 },
    { product: 'Ürün 2', sales: 120 },
    { product: 'Ürün 3', sales: 90 },
    { product: 'Ürün 4', sales: 60 },
    { product: 'Ürün 5', sales: 30 },
    { product: 'Ürün 6', sales: 20 },
    { product: 'Ürün 7', sales: 10 },
    { product: 'Ürün 8', sales: 5 },
    { product: 'Ürün 9', sales: 2 },
    { product: 'Ürün 10', sales: 1 },
  ];

  // Slice to get the top 5 and bottom 5 products
  const top5Products = data.slice(0, 5);
  const bottom5Products = data.slice(-5);

  return (
    <div className="w-full flex flex-col space-y-8">
      {/* Top 5 Products Chart */}
      <Card className='min-w-full' >
        <Title level={4} className="text-center mb-4">En Çok Satan 5 Ürün</Title>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={top5Products} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Bottom 5 Products Chart */}
      <Card c>
        <Title level={4} className="text-center mb-4">En Az Satan 5 Ürün</Title>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bottom5Products} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default SaleCharts;