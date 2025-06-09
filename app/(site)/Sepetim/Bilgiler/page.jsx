"use client"
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setAddressInfo } from "@/store/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const AddressForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAddressInfo(form));
    router.push("/Sepetim/Odeme");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Teslimat Adresi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Ad"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Soyad"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Telefon"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="E-posta"
                  value={form.email}
                  onChange={handleChange}
                  required
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="city">İl</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="İl"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="district">İlçe</Label>
                <Input
                  id="district"
                  name="district"
                  placeholder="İlçe"
                  value={form.district}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Adres</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Adres"
                value={form.address}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full h-12 text-base mt-2">Kaydet ve Devam Et</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddressForm;
