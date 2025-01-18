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

  if (pathname.startsWith("/Sepetim")) return null;

  const handleRemoveItem = (id, size, title) => {
    const confirmed = confirm(`${title} adlı ürünü sepetinizden çıkarmak istiyor musunuz?`);
    if (confirmed) {
      dispatch(removeFromCart({ id, size }));
    }
  };

  const drawerVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.2
      }
    }
  };

  const toggleButtonVariants = {
    shopping: {
      rotate: 0,
      scale: 1
    },
    close: {
      rotate: 180,
      scale: 1.1
    }
  };

  return (
    <>
      {/* Mobile Toggle Button - Only show if there are items */}
      {cartItems.length > 0 && (
        <motion.button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={`fixed bottom-4 right-4 z-50 sm:hidden p-4 rounded-full shadow-lg transition-all duration-300 ${
            isMobileOpen 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative"
            initial="shopping"
            animate={isMobileOpen ? "close" : "shopping"}
            variants={toggleButtonVariants}
            transition={{ duration: 0.3 }}
          >
            {isMobileOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <>
                <ShoppingBag className="h-6 w-6 text-white" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </>
            )}
          </motion.div>
        </motion.button>
      )}

      {/* Drawer */}
      <motion.div
        initial="closed"
        animate={isMobileOpen ? "open" : "closed"}
        variants={drawerVariants}
        className={`
          fixed right-0 top-0 h-full z-40 
          w-full sm:w-80 bg-white shadow-xl border-l border-gray-200 
          sm:translate-x-0 sm:top-24 sm:h-[calc(100vh-6rem)]
          ${!isMobileOpen ? 'translate-x-full sm:translate-x-0' : 'translate-x-0'}
          ${cartItems.length === 0 ? 'sm:hidden' : ''}
        `}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 bg-white z-10 border-b p-4">
          <h2 className="text-lg font-semibold">Sepetim ({cartItems.length})</h2>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 px-4 py-6 h-[calc(100vh-180px)] md:h-[calc(100vh-15rem)]">
          <AnimatePresence mode="popLayout">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ 
                  opacity: 0,
                  y: -20,
                  transition: { duration: 0.2 }
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
                        <motion.span
                           key={item.quantity}
                           initial={{ scale: 1.2, color: "#10B981" }}
                           animate={{ scale: 1, color: "#1F2937" }}
                           className="text-sm font-semibold"
                        >
                        <span className="text-xs text-gray-500">x{item.quantity}</span>
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>

        {/* Footer - Sticky Bottom */}
        <div className="sticky bottom-0 border-t bg-white p-4 shadow-up">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Ara Toplam:</span>
              <div className="flex items-baseline">
                <CountUp 
                  end={totalAmount} 
                  duration={0.8} 
                  decimals={2} 
                  className="text-lg font-semibold" 
                />
                <span className="ml-1 text-lg font-semibold">₺</span>
              </div>
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
      </motion.div>

      {/* Overlay with Animation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default SepetDrawer;
