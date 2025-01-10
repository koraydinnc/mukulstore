"use client"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '@/store/slices/adminSlice';
import { useLoginMutation } from '@/store/services/admin/authApi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(loginSuccess(result.admin));
      toast({
        title: "Başarılı!",
        description: "Giriş başarıyla yapıldı.",
      });
      router.replace('/admin/dashboard');
    } catch (error) {
      console.error('Login error: ', error);  // Detaylı hata kaydı
      toast({
        variant: "destructive",
        title: "Hata!",
        description: error?.data?.message || "Giriş yapılamadı.",
      });
      dispatch(loginFailure(error.message));
    }
    
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Girişi</CardTitle>
            <CardDescription>Lütfen giriş yapın</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}