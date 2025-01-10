import React, { useState } from "react";
import { usePhotosUploadMutation } from "@/store/services/admin/productApi";
import { Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { toast } from "@/hooks/use-toast";

const AdminPhotosAdd = ({ onChange, setImages }) => {
  const [imageList, setImageList] = useState([]);
  const [photosUpload, { isLoading }] = usePhotosUploadMutation();

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("files", file);

      const result = await photosUpload(formData).unwrap();

      if (result.urls) {
        const newImage = {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: result.urls[0],
        };

        setImages((prev) => [...prev, ...result.urls]);
        setImageList((prev) => [...prev, newImage]);
        onSuccess();
        onChange([...imageList, newImage]); // Notify parent with the updated list.

        toast({
          title: "Başarılı",
          description: "Fotoğraf yüklendi",
        });
      }
    } catch (error) {
      onError();
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
    onChange(updatedList); // Notify parent about the updated list.
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
        thumbUrl: file.url,
      }))}
      customRequest={handleUpload}
      onRemove={handleRemove}
    >
      {imageList.length >= 8 ? null : uploadButton}
    </Upload>
  );
};

export default AdminPhotosAdd;
