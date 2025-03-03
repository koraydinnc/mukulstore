"use client"

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginMutation } from "@/store/services/admin/authApi";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [adminLogin, { data, error, isLoading }] = useLoginMutation();

  const login = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const response = await adminLogin({ email, password }).unwrap();
      if (response.status === 1) {
        Cookies.set("adminToken", response.token, { expires: 7, secure: true });
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      console.error("Giriş başarısız", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Girişi</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={login}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gmail</label>
              <Input type="email" placeholder="example@gmail.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Şifre</label>
              <Input type="password" placeholder="******" required />
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
            {error && <p className="text-red-500 text-sm text-center">Giriş başarısız. Tekrar deneyin.</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
