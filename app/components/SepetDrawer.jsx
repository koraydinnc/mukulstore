"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/store/slices/cartSlice";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, ArrowLeft, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import { usePathname } from "next/navigation";

const SepetDrawer = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  if (cartItems.length === 0 || pathname.startsWith("/Sepetim")) return null;

  const handleRemoveItem = (id, size, title) => {
    const confirmed = confirm(`${title} adlı ürünü sepetinizden çıkarmak istiyor musunuz?`);
    if (confirmed) {
      dispatch(removeFromCart({ id, size }));
    }
  };

  return (
    <>
      {/* Mobil Toggle Butonu */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed bottom-4 right-4 z-50 md:hidden bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <div className="relative">
          <ShoppingBag className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        </div>
      </button>

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full z-40 w-full md:w-80 bg-white shadow-xl border-l border-gray-200 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobil Kapatma Butonu */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 md:hidden"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Drawer İçeriği */}
        <div className="flex flex-col h-full  md:pt-0">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Sepetim ({cartItems.length})</h2>
          </div>

          <ScrollArea className="flex-1 p-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: -50,
                    transition: { duration: 0.2 },
                  }}
                  className="mb-4"
                >
                  <Card className="p-3 relative group">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveItem(item.id, item.size, item.title)}
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </Button>
                    <div className="flex gap-3">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={`/uploads/${item.images[0]}`}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500">Beden: {item.size}</p>
                        <div className="flex justify-between items-center mt-1">
                          <motion.span
                            key={item.totalPrice}
                            initial={{ scale: 1.2, color: "#10B981" }}
                            animate={{ scale: 1, color: "#1F2937" }}
                            className="text-sm font-semibold"
                          >
                            ₺
                            <CountUp end={item.totalPrice} duration={0.5} decimals={2} />
                          </motion.span>
                          <span className="text-xs text-gray-500">x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>

          {/* Footer */}
          <div className="border-t bg-gray-50 p-4 ">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Ara Toplam:</span>
                <span className="text-lg font-bold text-gray-900">₺{totalAmount}</span>
              </div>
              <Link href="/Sepetim" className="block">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium"
                  onClick={() => setIsMobileOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Sepete Git ({cartItems.length})
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default SepetDrawer;
