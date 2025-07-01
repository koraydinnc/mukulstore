"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Menu, ShoppingCart, User, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import Favorites from "./Favorites";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import { useGetCategoriesQuery } from "@/store/services/user/categoryUserApi";
import { Modal } from "antd";
import SearchBar from "./SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [openSiparis, setOpenSiparis] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [siparisNo, setSiparisNo] = useState("");
  const [takipSonuc, setTakipSonuc] = useState(null);
  const [takipHata, setTakipHata] = useState("");
  const router = useRouter();
  const dipsatch = useDispatch();

  const { data } = useGetCategoriesQuery();

  const categories = [
    {
      name: "İndirimli Ürünler",
      href: "/Kategori/IndirimliUrunler",
    },
    {
      name: "Ayakkabı",
      href: "/Kategori/Ayakkabi",
    },
    { name: "Üst Giyim", href: "/Kategori/UstGiyim" },
    { name: "Alt Giyim", href: "/Kategori/AltGiyim" },
    { name: "Hakkımızda", href: "/Hakkimizda" },
  ];

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 60,
    restDelta: 0.8,
  });

  const handleRouteChange = (href) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleSiparisTakibi = () => {
    setOpenSiparis(!openSiparis);
  };

  const y = useTransform(scrollYProgress, [0, 0.8], [0, -25]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHeaderVisible(false);
      }
      
      setIsScrolled(currentScrollY > 0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHeaderVisible]);

  const handleSiparisSorgula = async () => {
    setTakipSonuc(null);
    setTakipHata("");
    if (!siparisNo) {
      setTakipHata("Lütfen sipariş numarasını girin.");
      return;
    }
    try {
      const res = await fetch(`/api/admin/orders-5534/${siparisNo}`);
      if (!res.ok) {
        setTakipHata("Sipariş bulunamadı.");
        return;
      }
      const data = await res.json();
      setTakipSonuc(data.order);
    } catch (err) {
      setTakipHata("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <>
      <motion.nav
        animate={{
          y: isHeaderVisible ? 0 : -100
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
        className="bg-black shadow fixed top-0 left-0 right-0 z-50"
      >
        <div className="relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 origin-[0%]"
            style={{ scaleX }}
          />

          <div className="container mx-auto flex h-24 items-center justify-between">
            <div className="flex items-center flex-1 md:flex-none">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-24 w-12 text-white hover:text-white/80 hover:bg-transparent"
                  >
                    <Menu className="h-12 w-12" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-[300px] sm:w-[400px] bg-white p-0"
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-start ml-8 items-center h-28 w-full">
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2"
                      >
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={50}
                          height={50}
                          className="rounded-2xl bg-black"
                        />
                      </Link>
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                      <div>
                        {categories.map((category) => (
                          <div key={category.name} className="mb-2">
                            <button
                              onClick={() => toggleCategory(category.name)}
                              className="flex items-center justify-between w-full p-3 text-left text-lg font-medium hover:bg-gray-50 rounded-lg transition-colors"
                              aria-label={`Kategori: ${category.name}`}
                            >
                              <span
                                onClick={() => handleRouteChange(category.href)}
                              >
                                {category.name}
                              </span>
                              {category.subcategories && (
                                <ChevronDown
                                  className={`h-5 w-5 transition-transform ${
                                    openCategories[category.name]
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              )}
                            </button>

                            <AnimatePresence>
                              {openCategories[category.name] &&
                                category.subcategories && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="ml-4 mt-2 space-y-2 overflow-hidden"
                                  >
                                    {category.subcategories.map((sub) => (
                                      <Link
                                        key={sub.name}
                                        href={sub.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors font-sans text-sm tracking-wide"
                                        aria-label={`Alt Kategori: ${sub.name}`}
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 mt-2 border-t border-gray-100">
                        <div className="rounded-lg overflow-hidden">
                          <Button
                            variant="default"
                            onClick={() => {
                              handleSiparisTakibi();
                              setIsOpen(false);
                            }}
                            className="w-full hover:bg-black hover:text-white text-black py-2.5 flex items-center justify-center gap-2"
                          >
                            <Search className="h-4 w-4" />
                            <span className="font-medium">Sipariş Takibi</span>
                          </Button>
                        </div>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <Link
                href="/"
                className="flex items-center justify-center md:ml-0 ml-auto mr-auto"
              >
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={400}
                  height={200}
                  className="md:h-24 h-16 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex md:items-center">
              <ul className="flex gap-6">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={category.href}
                      className="text-sm font-medium text-white transition-colors hover:text-white/80"
                      aria-label={`Kategori: ${category.name}`}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button
                    onClick={handleSiparisTakibi}
                    variant="default"
                    className=" text-white hover:text-white cursor-pointer mt-[-5px]"
                  >
                    Sipariş Takibi
                  </Button>
                  {openSiparis && (
                    <Modal
                      title={
                        <div className="text-xl font-medium text-center border-b pb-3">
                          Sipariş Takibi
                        </div>
                      }
                      open={openSiparis}
                      onCancel={() => setOpenSiparis(false)}
                      footer={null}
                      width={450}
                      className="font-sans"
                      centered
                    >
                      <div className="py-6 px-2">
                        <p className="text-gray-600 mb-5 text-center text-sm">
                          Siparişinizin durumunu kontrol etmek için
                          bilgilerinizi girin.
                        </p>

                        <div className="mb-5">
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Sipariş Numarası
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              className="w-full pl-10 pr-4 py-3  border rounded-lg   transition-all"
                              placeholder="Sipariş numaranızı giriniz"
                              value={siparisNo}
                              onChange={e => setSiparisNo(e.target.value)}
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1 pl-1">
                            Sipariş onay e-postanızda bulabilirsiniz
                          </p>
                        </div>
                        {takipHata && (
                          <div className="text-red-500 text-center mb-2 text-sm">{takipHata}</div>
                        )}
                        {takipSonuc && (
                          <div className="bg-green-50 border border-green-200 rounded p-3 mb-2 text-sm text-green-700">
                            <div><b>Sipariş No:</b> {takipSonuc.orderNo}</div>
                            <div><b>Durum:</b> {takipSonuc.status}</div>
                            <div><b>Ödeme:</b> {takipSonuc.paymentStatus}</div>
                            <div><b>Tarih:</b> {new Date(takipSonuc.createdAt).toLocaleString()}</div>
                            <div><b>Adres:</b> {takipSonuc.shippingAddress?.address}</div>
                            <div><b>Ürünler:</b>
                              <ul className="list-disc ml-4">
                                {takipSonuc.orderItems?.map(item => (
                                  <li key={item.id}>{item.quantity} x {item.size} - {item.price}₺</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-center">
                          <Button type="button" onClick={handleSiparisSorgula} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2">
                            <Search className="h-4 w-4" />
                            Siparişi Sorgula
                          </Button>
                        </div>
                      </div>
                    </Modal>
                  )}
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <SearchBar className="hidden md:block" />
              <CartItems />
              <Favorites />
              
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
};
export default Header;
