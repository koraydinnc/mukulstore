"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch as AntSwitch, Spin } from 'antd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminPhotosAdd from '@/app/components/AdminPhotosAdd';
import { useUploadImagesMutation, useCreateProductMutation } from '@/store/services/admin/productApi';
import { useGetCategoriesQuery } from '@/store/services/admin/categoryApi';
import openNotification from '@/app/components/Toaster';

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Ürün adı en az 2 karakter olmalıdır.",
  }),
  description: z.string().min(10, {
    message: "Açıklama en az 10 karakter olmalıdır.",
  }),
  price: z.string().refine((val) => !isNaN(val) && parseFloat(val) > 0, {
    message: "Geçerli bir fiyat giriniz.",
  }),
  discountPercentage: z.number().min(0).max(100).optional().default(0),
  images: z.array(z.string()).optional(),
  stock: z.string().refine((val) => !isNaN(val) && parseInt(val) >= 0, {
    message: "Geçerli bir stok miktarı giriniz.",
  }),
  featured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
  categoryId: z.string({
    required_error: "Lütfen kategori seçiniz.",
  }),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  sizes: z.array(
    z.object({
      size: z.string(),
      stock: z.string()
    })
  )
});

export default function ProductAddPage() {
  const [uploadImages] = useUploadImagesMutation();
  const [createProduct, { isLoading: productLoading }] = useCreateProductMutation();
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const [imageList, setImageList] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      discountPercentage: 0,
      images: [],
      stock: "",
      featured: false,
      isPopular: false,
      categoryId: "",
      status: "ACTIVE",
      sizes: [{ size: "", stock: "" }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sizes"
  });

  const watchSizes = form.watch("sizes");

  useEffect(() => {
    const lastSize = watchSizes?.[watchSizes.length - 1];
    if (lastSize?.size && lastSize?.stock) {
      append({ size: "", stock: "" });
    }
  }, [watchSizes, append]);

  const price = form.watch('price');
  const discountPercentage = form.watch('discountPercentage');
  
  const finalPrice = price && discountPercentage
    ? `${(parseFloat(price) - (parseFloat(price) * (discountPercentage || 0)) / 100).toFixed(2)} TL`
    : price ? `${parseFloat(price).toFixed(2)} TL` : "";

  if (productLoading || categoriesLoading) {
    return <Spin fullscreen />;
  }

  const handleImageUpload = (base64Image) => {
    setImageList(prev => [...prev, base64Image]);
  };

  async function onSubmit(values) {
    try {
      const uploadResponse = await uploadImages({ images: imageList }).unwrap();
      
      if (!uploadResponse.success) {
        throw new Error('Fotoğraf yükleme başarısız');
      }

      const selectedCategory = categories.categories.find(
        category => category.name === values.categoryId
      );

      if (!selectedCategory) {
        throw new Error('Geçersiz kategori');
      }

      const formData = {
        ...values,
        images: uploadResponse.imageUrls,
        categoryId: selectedCategory.id,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        sizes: values.sizes
          .filter(size => size.size && size.stock)
          .map(size => ({
            ...size,
            stock: parseInt(size.stock)
          }))
      };

      console.log('Gönderilen form verisi:', formData);

      const productResponse = await createProduct(formData).unwrap();
      
      if (productResponse.status === 1) {
        openNotification({
          variant: "success",
          title: "Başarılı!",
          description: "Ürün başarıyla eklendi.",
        });
        
        setImageList([]);
        form.reset();
      }
    } catch (error) {
      console.error("Hata:", error);
      openNotification({
        variant: "destructive",
        title: "Hata!",
        description: error?.data?.message || error.message || "Bir hata oluştu.",
      });
    }
  }

  return (
    <div className="p-6">
      <Card className="max-w-2xl mx-auto bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
        <CardHeader className="border-b border-zinc-200 dark:border-zinc-800">
          <CardTitle className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Yeni Ürün Ekle
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">Ürün Adı</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nike Air Max"
                        className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">Açıklama</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ürün açıklaması..."
                        className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700 dark:text-zinc-300">Fiyat</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-700 dark:text-zinc-300">Toplam Stok</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="sizes"
                render={() => (
                  <FormItem>
                    <FormLabel>Bedenler</FormLabel>
                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4">
                          <FormField
                            control={form.control}
                            name={`sizes.${index}.size`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Beden"
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      const finalValue = isNaN(value) 
                                        ? value.toUpperCase() 
                                        : value;
                                      field.onChange(finalValue);
                                    }}
                                    value={field.value}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`sizes.${index}.stock`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input {...field} type="number" placeholder="Stok" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <div>
                            <Button type="button" onClick={() => remove(index)}>
                              Sil
                            </Button>
                            <Button type="button" onClick={() => append({ size: "", stock: "" })}>
                              Ekle 
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">İndirim Yüzdesi (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600"
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === "" ? 0 : Number(value));
                        }}
                      />
                    </FormControl>
                    {finalPrice && (
                      <FormDescription className="text-sm text-zinc-600 dark:text-zinc-400">
                        İndirimli Fiyat: {finalPrice}
                      </FormDescription>
                    )}
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">Kategori</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value} 
                    >
                      <FormControl>
                        <SelectTrigger className="border-zinc-300 dark:border-zinc-700 focus:ring-zinc-400 dark:focus:ring-zinc-600">
                          <SelectValue placeholder="Kategori seçiniz" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {categories && categories.categories.map((category) => (
                          <SelectGroup key={category.id} title={category.name}>
                            <SelectItem value={category.name} key={category.id}>
                              {category.name} 
                            </SelectItem>
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-4">
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <AntSwitch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-zinc-700 dark:text-zinc-300">Öne Çıkan</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <AntSwitch
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-zinc-700 dark:text-zinc-300">Popüler</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">Durum</FormLabel>
                    <FormControl className='flex flex-col'>
                      <AntSwitch
                        checked={field.value === "ACTIVE"}
                        onChange={(checked) =>
                          field.onChange(checked ? "ACTIVE" : "INACTIVE")
                        }
                        checkedChildren="Active"
                        unCheckedChildren="Inactive"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <AdminPhotosAdd 
                      onImageUpload={handleImageUpload}
                      imageList={imageList}
                      onChange={setImageList}
                    />
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900"
                disabled={productLoading}
              >
                {productLoading ? "Yükleniyor..." : "Ürün Ekle"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}