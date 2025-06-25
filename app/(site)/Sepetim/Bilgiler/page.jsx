"use client"

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddressInfo } from "@/store/slices/cartSlice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  CheckCircle, 
  ArrowRight,
  Package,
  Shield,
  Truck
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const AddressForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const savedAddress = useSelector((state) => state.cart.addressInfo);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: ""
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Load saved address if exists
  useEffect(() => {
    if (savedAddress) {
      setForm(savedAddress);
    }
  }, [savedAddress]);

  const steps = [
    {
      title: "Kişisel Bilgiler",
      fields: ["firstName", "lastName", "phone", "email"],
      icon: User
    },
    {
      title: "Adres Bilgileri", 
      fields: ["city", "district", "address"],
      icon: MapPin
    }
  ];

  const validateStep = (stepIndex) => {
    const newErrors = {};
    const stepFields = steps[stepIndex].fields;
    
    stepFields.forEach(field => {
      if (!form[field]?.trim()) {
        newErrors[field] = "Bu alan zorunludur";
      } else if (field === "email" && !/\S+@\S+\.\S+/.test(form[field])) {
        newErrors[field] = "Geçerli bir e-posta adresi girin";
      } else if (field === "phone" && !/^[\d\s\-\+\(\)]{10,}$/.test(form[field])) {
        newErrors[field] = "Geçerli bir telefon numarası girin";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    dispatch(setAddressInfo(form));
    router.push("/Sepetim/Odeme");
  };

  const isStepCompleted = (stepIndex) => {
    return steps[stepIndex].fields.every(field => form[field]?.trim());
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Header with pattern */}
      <div className="relative bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="relative container mx-auto py-6 px-4">
          <motion.div variants={itemVariants}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/Sepetim">Sepetim</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Teslimat Bilgileri</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Teslimat Bilgileri
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      Siparişinizin güvenli teslimatı için bilgilerinizi girin
                    </p>
                  </div>
                  <Badge variant="outline" className="px-4 py-2 text-sm">
                    Adım {currentStep + 1} / {steps.length}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    {steps.map((step, index) => {
                      const Icon = step.icon;
                      const isActive = index === currentStep;
                      const isCompleted = index < currentStep || isStepCompleted(index);
                      
                      return (
                        <div key={index} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                            isCompleted ? 'bg-green-500 border-green-500 text-white' :
                            isActive ? 'bg-blue-500 border-blue-500 text-white' :
                            'bg-gray-100 border-gray-300 text-gray-400'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`w-20 h-1 mx-2 rounded-full transition-all duration-300 ${
                              index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {steps[currentStep].title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>

                    {currentStep === 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Ad *
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Adınızı girin"
                            value={form.firstName}
                            onChange={handleChange}
                            className={`h-12 transition-all duration-200 ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                          />
                          {errors.firstName && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600"
                            >
                              {errors.firstName}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Soyad *
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Soyadınızı girin"
                            value={form.lastName}
                            onChange={handleChange}
                            className={`h-12 transition-all duration-200 ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                          />
                          {errors.lastName && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600"
                            >
                              {errors.lastName}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Telefon *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="0555 123 45 67"
                            value={form.phone}
                            onChange={handleChange}
                            type="tel"
                            className={`h-12 transition-all duration-200 ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                          />
                          {errors.phone && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600"
                            >
                              {errors.phone}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            E-posta *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            placeholder="ornek@email.com"
                            value={form.email}
                            onChange={handleChange}
                            type="email"
                            className={`h-12 transition-all duration-200 ${errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                          />
                          {errors.email && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <Building className="w-4 h-4" />
                              İl *
                            </Label>
                            <Input
                              id="city"
                              name="city"
                              placeholder="İl seçin"
                              value={form.city}
                              onChange={handleChange}
                              className={`h-12 transition-all duration-200 ${errors.city ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                            />
                            {errors.city && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-600"
                              >
                                {errors.city}
                              </motion.p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="district" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              İlçe *
                            </Label>
                            <Input
                              id="district"
                              name="district"
                              placeholder="İlçe seçin"
                              value={form.district}
                              onChange={handleChange}
                              className={`h-12 transition-all duration-200 ${errors.district ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                            />
                            {errors.district && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-red-600"
                              >
                                {errors.district}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Detaylı Adres *
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            placeholder="Mahalle, sokak, bina no ve daire bilgilerinizi detaylı olarak yazın..."
                            value={form.address}
                            onChange={handleChange}
                            rows={4}
                            className={`transition-all duration-200 resize-none ${errors.address ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-200'}`}
                          />
                          {errors.address && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-red-600"
                            >
                              {errors.address}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  {currentStep > 0 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="px-6 py-3 h-12"
                    >
                      Geri
                    </Button>
                  ) : (
                    <div />
                  )}

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="px-8 py-3 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      "Kaydediliyor..."
                    ) : currentStep === steps.length - 1 ? (
                      <>
                        Kaydet ve Devam Et
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Devam Et
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Sipariş Özeti */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="w-5 h-5" />
                  Sipariş Özeti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Ürün Sayısı:</span>
                  <span className="font-medium">{totalQuantity} adet</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Ara Toplam:</span>
                  <span className="font-medium">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Kargo:</span>
                  <span className="font-medium text-green-600">Ücretsiz</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Toplam:</span>
                    <span className="text-xl font-bold text-blue-600">₺{totalAmount?.toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Güvenlik Bilgileri */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Güvenli Alışveriş</h4>
                      <p className="text-sm text-green-600">256-bit SSL şifreleme</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Hızlı Teslimat</h4>
                      <p className="text-sm text-green-600">1-3 iş günü içinde</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AddressForm;
