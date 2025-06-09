"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/store/services/admin/authApi";
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/adminSlice";
import Cookies from 'js-cookie';

const adminCookie = Cookies.get('admin');
const initialState = {
  admin: adminCookie && adminCookie !== "undefined" ? JSON.parse(adminCookie) : null,
  isAuthenticated: !!(adminCookie && adminCookie !== "undefined"),
  loading: false,
  error: null
};

export function LoginForm({ className, ...props }) {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.admin?.isAuthenticated ?? false);
  const adminInfo = useSelector(state => state.admin?.admin ?? null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/panel");
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await login(form).unwrap();
      dispatch(loginSuccess(res.admin));
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...", {
        duration: 2000,
      });
      router.push("/admin-5534/dashboard");
    } catch (err) {
      const errorMessage =
        err?.data?.error ||
        "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage, {
        description: "Email ve şifrenizi kontrol edip tekrar deneyin.",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center min-h-screen justify-center w-full max-w-xl",
        className
      )}
      {...props}
    >
      <Card className="w-full ">
        <CardHeader className="text-center pb-6">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/logo.png"
              alt="logo Logo"
              width={300}
              height={300}
              className="dark:bg-black  p-12 rounded-lg bg-black rounded-xl "
            />
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@mukul.com"
                  required
                  className="h-11 "
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Şifre</Label>
                  <a
                    href="#"
                    className="text-xs text-[#063487] hover:underline dark:text-[#6b8adc]"
                  >
                    Şifremi unuttum
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="h-11 pr-10 dark:bg-[#232329] dark:text-white"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    tabIndex="-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full cursor-pointer h-11 bg-[#063487] hover:bg-[#174599] text-white transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş Yapılıyor...
                </>
              ) : (
                "Giriş Yap"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="text-xs text-muted-foreground mt-4 text-center dark:text-gray-400">
        Bu panel yalnızca MukulStore yetkilileri içindir.
      </div>
    </div>
  );
}
