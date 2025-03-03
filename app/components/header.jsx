"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState({});
  const [openSiparis, setOpenSiparis] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  console.log(cartItems);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 60,
    restDelta: 0.8,
  });

  const handleRouteChange = (href) => {
    setIsOpen(false);
    console.log(href);
    router.push(href);
  };

  const handleSiparisTakibi = () => {
    setOpenSiparis(!openSiparis);
  };

  const y = useTransform(scrollYProgress, [0, 0.8], [0, -25]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <motion.nav
        style={{ y }}
        className="bg-black shadow fixed top-0 left-0 right-0 z-50 transition-transform duration-200 ease-in-out"
      >
        <div className="relative">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 origin-[0%]"
            style={{ scaleX }}
          />

          {/* Main header content */}
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
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1 pl-1">
                            Sipariş onay e-postanızda bulabilirsiniz
                          </p>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            E-posta Adresi
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <input
                              type="email"
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg   transition-all"
                              placeholder="Siparişte kullandığınız email"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2">
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
              <CartItems />
              <Favorites />
            </div>
          </div>
        </div>
      </motion.nav>
      <div className="h-24" /> {/* Header'ın yüksekliği kadar boşluk */}
    </>
  );
};
export default Header;
