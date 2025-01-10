import React, { useState } from 'react';
import { List, Avatar, Button, Modal, Form, Input, InputNumber, Switch } from 'antd';
import { useDeleteProductMutation, useUpdateProductMutation } from '@/store/services/admin/productApi';
import openNotification from './Toaster';
import AdminPhotosUpdate from './AdminPhotosUpdate';

const AdminProductsList = ({ data, refetch }) => {
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [images, setImages] = useState([]);

  const showModal = (product) => {
    setCurrentProduct(product);
    setImages(product.images || []);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentProduct(null);
    setImages([]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(Number(id)).unwrap();
      openNotification({ title: 'Başarılı', description: 'Ürün başarıyla silindi.', type: 'success' });
      refetch();
    } catch (error) {
      console.log(error);
      openNotification({ title: 'Hata', description: error.data.message, type: 'error' });
    }
  };

  const handleUpdate = async (values) => {
    try {
      const updatedValues = {
        ...values,
        price: parseFloat(values.price),
        discountPercentage: values.discountPercentage ? parseFloat(values.discountPercentage) : null,
        stock: parseInt(values.stock),
        categoryId: parseInt(values.categoryId),
        images, 
      };

      await updateProduct({ id: currentProduct.id, values: updatedValues }).unwrap();
      openNotification({ title: 'Başarılı', description: 'Ürün başarıyla güncellendi.', variant: 'success' });
      refetch();
      handleCancel();
    } catch (error) {
      console.log(error);
      openNotification({ title: 'Hata', description: error.data.message, type: 'error' });
    }
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="dashed" onClick={() => showModal(item)} key="edit">Düzenle</Button>,
              <Button type="danger" onClick={() => handleDelete(item.id)} key="delete">Sil</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/150'} />}
              title={item.title}
              description={item.description}
            />
            <div>
              <p>Fiyat: ₺{item.price}</p>
              <p>Stok: {item.stock}</p>
              <p>Durum: {item.status}</p>
            </div>
          </List.Item>
        )}
      />

      {currentProduct && (
        <Modal
          title="Ürünü Güncelle"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            initialValues={currentProduct}
            onFinish={handleUpdate}
            layout="vertical"
          >
            <Form.Item
              name="title"
              label="Başlık"
              rules={[{ required: true, message: 'Lütfen başlığı girin!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Açıklama"
              rules={[{ required: true, message: 'Lütfen açıklamayı girin!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="price"
              label="Fiyat"
              rules={[{ required: true, message: 'Lütfen fiyatı girin!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="images"
              label="Fotoğraflar"
            >
              <AdminPhotosUpdate images={images} setImages={setImages} />
            </Form.Item>
            <Form.Item
              name="stock"
              label="Stok"
              rules={[{ required: true, message: 'Please input the stock!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="featured"
              label="Öne Çıkan"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="isPopular"
              label="Popüler"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Kategori ID"
              rules={[{ required: true, message: 'Lütfen kategori ID\'sini girin!' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Durum"
              rules={[{ required: true, message: 'Lütfen durumu girin!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Güncelle
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default AdminProductsList;
