import React from 'react';
import { Alert, List } from 'antd';

const stockData = [
  { product: 'Ürün 1', stock: 5 },
  { product: 'Ürün 2', stock: 2 },
  { product: 'Ürün 3', stock: 0 },
  // Daha fazla ürün ekleyin
];

const StockAlert = () => {
  const criticalStock = stockData.filter(item => item.stock <= 5);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Kritik Stok Uyarıları</h2>
      {criticalStock.length > 0 ? (
        <List
          dataSource={criticalStock}
          renderItem={item => (
            <List.Item>
              <Alert
                message={`${item.product} - Stok: ${item.stock}`}
                type="warning"
                showIcon
              />
            </List.Item>
          )}
        />
      ) : (
        <Alert message="Kritik stok seviyesinde ürün yok." type="success" showIcon />
      )}
    </div>
  );
};

export default StockAlert;