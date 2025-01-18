import React, { useState } from "react";
import { usePhotosUploadMutation } from "@/store/services/admin/productApi";
import { Upload } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import openNotification from "./Toaster";

const AdminPhotosAdd = ({ onChange, setImages }) => {
  const [imageList, setImageList] = useState([]);
  const [photosUpload, { isLoading }] = usePhotosUploadMutation();

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      if (imageList.length >= 8) {
        openNotification({
          variant: "warning",
          title: "Limit Aşıldı",
          description: "En fazla 8 fotoğraf yükleyebilirsiniz.",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const result = await photosUpload(formData).unwrap();
      console.log("Yükleme başarılı, sunucu yanıtı:", result);

      if (result.urls) {
        const newImage = {
          uid: file.uid,
          name: file.name,
          status: "done",
          url: result.urls[0],
        };

        const newImageList = [...imageList, newImage];
        setImageList(newImageList);
        setImages((prev) => [...prev, result.urls[0]]);
        onChange(newImageList);

        openNotification({
          title: "Başarılı",
          description: "Fotoğraf yüklendi",
        });
      } else {
        throw new Error("Sunucu beklenen yanıtı döndürmedi.");
      }
    } catch (error) {
      console.error("Yükleme sırasında hata:", error);
      onError(error);
      openNotification({
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
    onChange(updatedList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      openNotification({
        variant: "destructive",
        title: "Hata",
        description: "Sadece görüntü dosyaları yükleyebilirsiniz!",
      });
    }
    const isSmallEnough = file.size / 1024 / 1024 < 10;
    if (!isSmallEnough) {
      openNotification({
        variant: "destructive",
        title: "Hata",
        description: "Dosya boyutu 10 MB'den küçük olmalıdır.",
      });
    }
    return isImage && isSmallEnough;
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
      beforeUpload={beforeUpload}
    >
      {imageList.length >= 8 ? null : uploadButton}
    </Upload>
  );
};

export default AdminPhotosAdd;
