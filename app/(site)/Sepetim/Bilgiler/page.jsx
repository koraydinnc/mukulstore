"use client"
import { useState } from "react";
import { Form, Input, Select, Button, Space, Typography, Card } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumb from "@/app/components/Breadcrumb";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

export default function AddressForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb />
        <motion.div
          className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Title level={2} className="mb-6 text-center text-gray-800">
            Teslimat Bilgileri
          </Title>
          <Card bordered={false} className="shadow-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
            >
              <Space direction="vertical" size="large" className="w-full">
                {/* Kişisel Bilgiler */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    name="firstName"
                    label="Ad"
                    rules={[{ required: true, message: "Lütfen adınızı girin" }]}
                  >
                    <Input placeholder="Adınız" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label="Soyad"
                    rules={[{ required: true, message: "Lütfen soyadınızı girin" }]}
                  >
                    <Input placeholder="Soyadınız" className="rounded-lg" />
                  </Form.Item>
                </div>

                <Form.Item
                  name="phone"
                  label="Telefon"
                  rules={[
                    { required: true, message: "Lütfen telefon numaranızı girin" },
                    { pattern: /^[0-9]{10}$/, message: "Geçerli bir telefon numarası girin" }
                  ]}
                >
                  <Input placeholder="5XX XXX XX XX" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="E-posta"
                  rules={[
                    { required: true, message: "Lütfen e-posta adresinizi girin" },
                    { type: "email", message: "Geçerli bir e-posta adresi girin" }
                  ]}
                >
                  <Input placeholder="ornek@email.com" className="rounded-lg" />
                </Form.Item>

                {/* Adres Bilgileri */}
                <Form.Item
                  name="city"
                  label="İl"
                  rules={[{ required: true, message: "Lütfen il seçin" }]}
                >
                  <Select placeholder="İl seçin" className="rounded-lg">
                    <Option value="istanbul">İstanbul</Option>
                    <Option value="ankara">Ankara</Option>
                    <Option value="izmir">İzmir</Option>
                    {/* Diğer iller */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="district"
                  label="İlçe"
                  rules={[{ required: true, message: "Lütfen ilçe seçin" }]}
                >
                  <Select placeholder="İlçe seçin" className="rounded-lg">
                    <Option value="kadikoy">Kadıköy</Option>
                    <Option value="besiktas">Beşiktaş</Option>
                    <Option value="sisli">Şişli</Option>
                    {/* Diğer ilçeler */}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="address"
                  label="Açık Adres"
                  rules={[{ required: true, message: "Lütfen açık adresinizi girin" }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Mahalle, sokak, apartman no, daire no vb."
                    className="rounded-lg"
                  />
                </Form.Item>

                <Form.Item
                  name="addressTitle"
                  label="Adres Başlığı"
                  rules={[{ required: true, message: "Lütfen adres başlığı girin" }]}
                >
                  <Input placeholder="Örn: Ev, İş" className="rounded-lg" />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Link href="/Sepetim/Odeme">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg"
                      loading={loading}
                    >
                      Devam Et
                    </Button>
                  </Link>
                </Form.Item>
              </Space>
            </Form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}