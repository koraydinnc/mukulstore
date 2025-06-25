"use client";

import { useSelector, useDispatch } from "react-redux";
import { Heart, X, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { removeFromFavorites } from "@/store/slices/favoritesSlice";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-800 hover:text-gray-600 group"
        >
          <motion.div>
            <Heart className="h-5 w-5 text-white group-hover:fill-red-500" />
            <Badge
              variant="destructive"
              className={`absolute text-black bg-white rounded-2xl -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 transition-opacity duration-200 ${
                favorites?.length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              {favorites?.length || 0}
            </Badge>
          </motion.div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 bg-white shadow-xl rounded-lg p-4 border border-gray-200"
      >
        {favorites.length === 0 ? (
          <DropdownMenuItem className="text-center py-6 text-gray-500">
            Favori ürününüz bulunmamaktadır
          </DropdownMenuItem>
        ) : (
          <div className="space-y-4">
            {favorites.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg shadow-sm border border-gray-100"
              >
                {/* Ürün Görseli */}
                <div className="relative h-16 w-16 flex-shrink-0">
                  <Image
                    src={
                      product.images[0].includes(
                        "firebasestorage.googleapis.com"
                      )
                        ? product.images[0]
                        : `/uploads/${product.images[0]}`
                    }
                    alt={product.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className="flex-1">
                  <Link
                    href={`/urun/${product.id}`}
                    className="text-sm font-medium hover:text-blue-600 line-clamp-2"
                  >
                    {product.title}
                  </Link>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-600">
                      {product.price} TL
                    </span>
                    <span className="text-xs text-green-600 font-semibold">
                      {product.discountPercentage
                        ? `%${product.discountPercentage} İndirim`
                        : ""}
                    </span>
                  </div>
                </div>

                {/* Aksiyonlar - Responsive */}
                <div className="flex gap-1 sm:gap-2 flex-shrink-0">
                  <Link href={"/Sepetim"}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-[10px] xs:text-xs rounded-xl text-white bg-blue-600 hover:bg-blue-500 px-2 sm:px-3 h-8"
                    >
                      <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" />
                      <span className="hidden xs:inline">Satın Al</span>
                      <span className="inline xs:hidden">Al</span>
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeFromFavorites(product.id))}
                    className="hover:text-red-500 h-8 w-8 p-1.5"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Favorites;
