"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, ShoppingCart, User, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

const categories = [
  {
    name: "İndirimli Ürünler",
    href: "/category/sale",
    subcategories: [
      { name: "Yeni İndirimler", href: "/category/sale/new" },
      { name: "Sezon Sonu", href: "/category/sale/season-end" },
    ]
  },
  {
    name: "Ayakkabı",
    href: "/category/shoes",
    subcategories: [
      { name: "Spor Ayakkabı", href: "/category/shoes/sneakers" },
      { name: "Günlük Ayakkabı", href: "/category/shoes/casual" },
      { name: "Bot", href: "/category/shoes/boots" },
    ]
  },
  { name: "Üst Giyim", href: "/category/tops" },
  { name: "Alt Giyim", href: "/category/bottoms" },
  { name: "Eşofman", href: "/category/sportswear" },
  { name: "Dış Giyim", href: "/category/outerwear" },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openCategories, setOpenCategories] = useState({})

  const toggleCategory = (categoryName) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }))
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container mx-auto flex h-24 items-center justify-between">
        {/* Sol Kısım - Mobil Menü ve Logo */}
        <div className="flex items-center flex-1 md:flex-none">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className=" h-24 w-12 text-white hover:text-white/80 hover:bg-transparent">
                <Menu className="h-12 w-12" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-white p-0">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-start ml-8 items-center h-28 w-full">
                  <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                    <Image src="/logo.png" alt="Logo" width={200} height={200} className="rounded-lg bg-black" />
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto">
                  <div className="">
                    {categories.map((category) => (
                      <div key={category.name} className="mb-2">
                        <button
                          onClick={() => toggleCategory(category.name)}
                          className="flex items-center justify-between w-full p-3 text-left text-lg font-medium hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <span className="font-sans tracking-wide">{category.name}</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openCategories[category.name] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {/* Subcategories */}
                        {openCategories[category.name] && category.subcategories && (
                          <div className="ml-4 mt-2 space-y-2">
                            {category.subcategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="block p-2 text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors font-sans text-sm tracking-wide"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="border-t p-4">
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/account"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-black font-sans"
                    >
                      <User className="h-5 w-5" />
                      <span className="tracking-wide">Hesabım</span>
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-black font-sans"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span className="tracking-wide">Sepetim</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center justify-center md:ml-0 ml-auto mr-auto">
            <Image
              src="/logo.png"
              alt="Logo"
              width={400}
              height={200}
              className="md:h-24 h-16 w-auto"
            />
          </Link>
        </div>

        {/* Orta Kısım - Desktop Kategoriler */}
        <nav className="hidden md:flex md:items-center">
          <ul className="flex gap-6">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="text-sm font-medium text-white transition-colors hover:text-white/80"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sağ Kısım - Sepet ve Kullanıcı */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:text-wihte/80">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative text-white hover:text-white/80">
            <ShoppingCart className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -right-2 -top-2 h-5 w-5 flex bg-white text-black justify-center rounded-full p-0 text-xs"
            >
              3
            </Badge>
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
