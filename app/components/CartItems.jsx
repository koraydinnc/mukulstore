"use client";

import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag, ShoppingCart, X, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import openNotification from "./Toaster";

const CartItems = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleRemoveItem = (itemId, size) => {
    dispatch(removeFromCart({ id: itemId, size }));
    openNotification({
      variant: "default",
      title: "Ürün Kaldırıldı",
      description: "Ürün sepetinizden kaldırıldı.",
    });
  };

  const handleQuantityChange = (itemId, size, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId, size);
    } else {
      dispatch(updateQuantity({ id: itemId, size, quantity: newQuantity }));
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80">
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 flex bg-white text-black justify-center rounded-full p-0 text-xs"
            >
              {totalQuantity}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 bg-white shadow-xl rounded-lg p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p>Sepetiniz boş</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg group"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.images[0].includes("firebasestorage.googleapis.com") ? item.images[0] : `/uploads/${item.images[0]}`} 
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/Urunler/${item.id}`}
                      className="text-sm font-medium hover:text-blue-600 line-clamp-1 block"
                      onClick={() => setOpen(false)}
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                      <span>Beden: {item.size}</span>
                      <span className="mx-2">|</span>
                      <span>Adet: {item.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium text-gray-900">
                        ₺{((item.discountedPrice || item.price) * item.quantity).toLocaleString('tr-TR')}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-xs text-green-600 font-medium">
                          %{item.discountPercentage} İndirim
                        </span>
                      )}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          <span className="text-xs font-bold">−</span>
                        </button>
                        <span className="text-sm font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          disabled={item.quantity >= 10}
                          className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-xs font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id, item.size)}
                    className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    title="Sepetten Kaldır"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Toplam Tutar:</span>
                <span className="text-lg font-bold text-gray-900">
                  ₺{totalAmount?.toLocaleString('tr-TR')}
                </span>
              </div>
              <Link href="/Sepetim" className="w-full" onClick={() => setOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-medium">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Sepete Git ({totalQuantity} Ürün)
                </Button>
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartItems;
