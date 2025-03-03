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
    // Mevcut ve yeni fotoğrafları ayır
    const existingImages = images.filter(img => img.startsWith('http'));
    const newImages = images.filter(img => img.startsWith('blob'));

    // Yeni fotoğrafları yükle
    let uploadedImages = [...existingImages];
    
    if (newImages.length > 0) {
      // Base64'e dönüştürme işlemi
      const base64Images = await Promise.all(
        newImages.map(async (blobUrl) => {
          const response = await fetch(blobUrl);
          const blob = await response.blob();
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
          });
        })
      );

      // Fotoğrafları yükle
      const uploadResponse = await fetch('/api/admin/product/photos-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          images: base64Images 
        }),
      });

      if (!uploadResponse.ok) {
        throw new Error('Fotoğraf yükleme başarısız');
      }

      const uploadResult = await uploadResponse.json();
      
      if (!uploadResult.success) {
        throw new Error(uploadResult.message || 'Fotoğraf yükleme başarısız');
      }

      // Burayı düzelttik - imageUrls direkt olarak bir array
      uploadedImages = [...existingImages, ...uploadResult.imageUrls];
    }

    console.log('Güncellenecek görsel listesi:', uploadedImages); // Debug için

    const updatedValues = {
      ...values,
      price: parseFloat(values.price),
      discountPercentage: values.discountPercentage ? parseFloat(values.discountPercentage) : null,
      categoryId: parseInt(values.categoryId),
      images: uploadedImages
    };

    // Debug için
    console.log('Güncellenecek değerler:', updatedValues);

    const result = await updateProduct({ 
      id: currentProduct.id, 
      values: updatedValues 
    }).unwrap();

    // Debug için
    console.log('Güncelleme sonucu:', result);

    openNotification({ 
      title: 'Başarılı', 
      description: 'Ürün başarıyla güncellendi.', 
      variant: 'success' 
    });

    refetch();
    handleCancel();

  } catch (error) {
    console.error('Güncelleme hatası:', error);
    openNotification({ 
      title: 'Hata', 
      description: error.message || 'Ürün güncellenirken bir hata oluştu', 
      type: 'error' 
    });
  }
};

  console.log(data, "data")

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
              name="discountPercentage"
              label="İndirim Yüzdesi (%)"
              rules={[{ required: true, message: 'Lütfen indirim yüzdesini girin!' }]}
            >
              <InputNumber min={0} max={100} />
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
              rules={[{ required: true, message: 'Lütfen stok miktarını girin!' }]}
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