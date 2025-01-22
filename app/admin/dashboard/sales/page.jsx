'use client'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSales, setLoading } from '@/store/slices/salesSlice';
import { DatePicker, Table, Card, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SalesPage = () => {
  const dispatch = useDispatch();
  const { sales, loading } = useSelector(state => state.sales);
  const [dateRange, setDateRange] = useState([]);

  const columns = [
    { title: 'Sipariş ID', dataIndex: 'id', key: 'id' },
    { title: 'Müşteri', dataIndex: ['customerInfo', 'name'], key: 'customer' },
    { title: 'Toplam', dataIndex: 'totalAmount', key: 'total',
      render: (amount) => `₺${amount.toFixed(2)}` },
    { title: 'Tarih', dataIndex: 'date', key: 'date',
      render: (date) => new Date(date?.toDate()).toLocaleString() },
    { title: 'Durum', dataIndex: 'status', key: 'status' },
  ];

  useEffect(() => {
    loadSales();
  }, [dateRange]);

  const loadSales = async () => {
    dispatch(setLoading(true));
    try {
      dispatch(setSales(salesData));
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const averageOrderValue = totalRevenue / (sales.length || 1);

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Statistic title="Toplam Satış" value={totalRevenue} prefix="₺" />
        </Card>
        <Card>
          <Statistic title="Sipariş Sayısı" value={sales.length} />
        </Card>
        <Card>
          <Statistic 
            title="Ortalama Sipariş Değeri" 
            value={averageOrderValue} 
            prefix="₺"
            precision={2}
          />
        </Card>
      </div>

      <DatePicker.RangePicker onChange={setDateRange} />
      
      <Table 
        columns={columns} 
        dataSource={sales}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default SalesPage;
