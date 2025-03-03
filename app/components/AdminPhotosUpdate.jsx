"use client";

import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from '@/hooks/use-toast';
import { useDeletePhotoMutation } from '@/store/services/admin/productApi';

const AdminPhotosUpdate = ({ images = [], setImages }) => {  // Default value for images is an empty array
  const [imageList, setImageList] = useState([]);
  const [deletePhoto] = useDeletePhotoMutation();

  useEffect(() => {
    if (images?.length) {
      setImageList(images.map((url, index) => ({
        uid: index,
        name: `image-${index}`,
        status: 'done',
        url,
      })));
    }
  }, [images]);

  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setIsLoading(true);
    try {
      // Simulate an upload process
      setTimeout(() => {
        const newImageUrl = URL.createObjectURL(file);
        setImageList((prev) => [...prev, { uid: file.uid, name: file.name, status: 'done', url: newImageUrl }]);
        setImages((prev) => [...prev, newImageUrl]);
        onSuccess();
        setIsLoading(false);
        toast({
          variant: "success",
          title: "Başarılı",
          description: "Fotoğraf yüklendi",
        });
      }, 1000);
    } catch (error) {
      onError();
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Fotoğraf yüklenemedi",
      });
    }
  };

  const handleRemove = (file) => {
    const updatedList = imageList.filter((item) => item.uid !== file.uid);
    setImageList(updatedList);
    setImages((prev) => prev.filter((url) => url !== file.url));
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Fotoğraf Yükle</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      fileList={imageList.map((file) => ({
        ...file,
      }))}
      customRequest={handleUpload}
      onRemove={handleRemove}
    >
      {imageList.length >= 8 ? null : uploadButton}
    </Upload>
  );
};

export default AdminPhotosUpdate;
