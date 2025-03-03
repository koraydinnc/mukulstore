"use client";

import React, { useState } from 'react';
import { Table, Input, Button, Space, Typography, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const stockData = [
  {
    key: '1',
    product: 'Ürün 1',
    category: 'Kategori 1',
    stock: 50,
    status: 'Yeterli',
  },
  {
    key: '2',
    product: 'Ürün 2',
    category: 'Kategori 2',
    stock: 10,
    status: 'Kritik',
  },
  // Daha fazla ürün ekleyin
];

const StockPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Ara ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Ara
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Sıfırla
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Ürün',
      dataIndex: 'product',
      key: 'product',
      ...getColumnSearchProps('product'),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      ...getColumnSearchProps('category'),
    },
    {
      title: 'Stok',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Yeterli', value: 'Yeterli' },
        { text: 'Kritik', value: 'Kritik' },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status) => {
        return (
          <Tag color={status === 'Yeterli' ? 'green' : 'red'}>{status}</Tag>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Typography.Title level={2} className="mb-4">Stok Takip</Typography.Title>
        <Table
          columns={columns}
          dataSource={stockData}
          rowKey="key"
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default StockPage;
