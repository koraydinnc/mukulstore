'use client';

import { useState } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Label } from "@/components/ui/label";

const AdminPhotosAdd = ({ onImageUpload, imageList = [], onChange }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      setLoading(true);
      
      if (!file.type.startsWith('image/')) {
        throw new Error('Lütfen sadece resim dosyası yükleyin');
      }

      const base64 = await convertToBase64(file);
      
      // Parent componente base64'ü gönder
      onImageUpload(base64);
      
      // Dosya listesini güncelle
      const newFile = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: URL.createObjectURL(file),
      };
      
      setFileList(prev => [...prev, newFile]);
      onSuccess();
      
      message.success('Fotoğraf başarıyla yüklendi');
    } catch (error) {
      console.error('Upload error:', error);
      message.error(error.message || 'Fotoğraf yüklenirken bir hata oluştu');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter(item => item.uid !== file.uid);
    setFileList(newFileList);
    // Parent componente güncel listeyi bildir
    const updatedBase64List = imageList.filter((_, index) => 
      index !== fileList.findIndex(f => f.uid === file.uid)
    );
    onChange?.(updatedBase64List);
  };

  return (
    <div>
      <Label>Ürün Fotoğrafları</Label>
      <div className="mt-2">
        <Upload
          customRequest={handleUpload}
          listType="picture-card"
          fileList={fileList}
          accept="image/*"
          multiple={true}
          maxCount={8}
          onRemove={handleRemove}
          showUploadList={{
            showPreviewIcon: true,
            showRemoveIcon: true,
            showDownloadIcon: false,
          }}
        >
          {fileList.length >= 8 ? null : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div className="mt-2">Fotoğraf Ekle</div>
            </div>
          )}
        </Upload>
      </div>
    </div>
  );
};

// Base64 dönüşüm fonksiyonu
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default AdminPhotosAdd;