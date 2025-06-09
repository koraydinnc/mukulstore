'use client'
import { useEffect, useState } from 'react';
import { Table, Card, Statistic, Modal, Button, Row, Col } from 'antd';
import { useGetOrdersQuery } from '@/store/services/admin/paymentApi';
import { EyeOutlined } from '@ant-design/icons';

const SalesPage = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const orders = data?.orders || [];
  const [detailOrder, setDetailOrder] = useState(null);

  const columns = [
    { title: 'Sipariş No', dataIndex: 'orderNo', key: 'orderNo' },
    { title: 'Müşteri', dataIndex: ['shippingAddress', 'fullName'], key: 'customer',
      render: (_, record) => record.shippingAddress?.fullName || '-' },
    { title: 'Toplam', dataIndex: 'totalAmount', key: 'total',
      render: (amount) => `₺${Number(amount).toLocaleString('tr-TR')}` },
    { title: 'Tarih', dataIndex: 'createdAt', key: 'createdAt',
      render: (date) => new Date(date).toLocaleString('tr-TR') },
    { title: 'Durum', dataIndex: 'status', key: 'status',
      render: (status) => status === 'completed' ? 'Tamamlandı' : status },
    { title: 'Ödeme', dataIndex: 'paymentStatus', key: 'paymentStatus',
      render: (status) => status === 'paid' ? 'Ödendi' : status },
    {
      title: 'Detay',
      key: 'actions',
      render: (_, record) => (
        <Button icon={<EyeOutlined />} onClick={() => setDetailOrder(record)}>
          Detay
        </Button>
      ),
    },
  ];

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;

  return (
    <div className="space-y-6 p-6">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Toplam Satış" value={totalRevenue} prefix="₺" />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Sipariş Sayısı" value={orders.length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic 
              title="Ortalama Sipariş Değeri" 
              value={averageOrderValue} 
              prefix="₺"
              precision={2}
            />
          </Card>
        </Col>
      </Row>
      <Table 
        columns={columns} 
        dataSource={orders}
        loading={isLoading}
        rowKey="id"
      />
      <Modal
        open={!!detailOrder}
        onCancel={() => setDetailOrder(null)}
        title={`Sipariş Detayı - ${detailOrder?.orderNo}`}
        footer={<Button onClick={() => setDetailOrder(null)}>Kapat</Button>}
        width={600}
      >
        {detailOrder && (
          <div className="space-y-4">
            <div>
              <b>Alıcı:</b> {detailOrder.shippingAddress?.fullName}<br />
              <b>Adres:</b> {detailOrder.shippingAddress?.address}, {detailOrder.shippingAddress?.city}<br />
              <b>Telefon:</b> {detailOrder.shippingAddress?.phone}
            </div>
            <div>
              <b>Ürünler:</b>
              <ul style={{ marginLeft: 0, padding: 0, listStyle: 'none' }}>
                {detailOrder.orderItems?.map((item) => (
                  <li key={item.id} style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>Ürün ID: {item.productId}</div>
                      <div>Beden: {item.size} | Adet: {item.quantity} | Fiyat: ₺{item.price}</div>
                    </div>
                  </li>
                )) || []}
              </ul>
            </div>
            <div>
              <b>Toplam Tutar:</b> ₺{detailOrder.totalAmount}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SalesPage;
