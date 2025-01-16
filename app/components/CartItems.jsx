"use client";

import { useSelector } from "react-redux";
import { ShoppingCart, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const CartItems = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <DropdownMenu>
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
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      alt={item.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/product/${item.id}`}
                      className="text-sm font-medium hover:text-blue-600 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <div className="text-xs text-gray-500 mt-1">
                      <span>Beden: {item.size}</span>
                      <span className="mx-2">|</span>
                      <span>Adet: {item.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm font-medium">
                        ₺{(item.discountedPrice || item.price) * item.quantity}
                      </span>
                      {item.discountPercentage > 0 && (
                        <span className="text-xs text-green-600">%{item.discountPercentage} İndirim</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Toplam Tutar:</span>
                <span className="text-lg font-bold">₺{totalAmount}</span>
              </div>
              <Link href="/cart" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
