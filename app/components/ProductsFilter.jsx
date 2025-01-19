"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, SlidersHorizontal, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsFilter = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    size: [],
    priceRange: 'all',
    sort: 'newest'
  });

  const categories = [
    {
      name: 'Üst Giyim',
      value: 'ust-giyim',
      items: ['T-Shirt', 'Sweatshirt', 'Gömlek', 'Ceket', 'Mont']
    },
    {
      name: 'Alt Giyim',
      value: 'alt-giyim',
      items: ['Pantolon', 'Şort', 'Eşofman', 'Tayt']
    },
    {
      name: 'Ayakkabı',
      value: 'ayakkabi',
      items: ['Spor Ayakkabı', 'Bot', 'Günlük Ayakkabı', 'Terlik']
    },
    {
      name: 'Aksesuar',
      value: 'aksesuar',
      items: ['Çanta', 'Cüzdan', 'Kemer', 'Şapka']
    }
  ];

  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = Array.from({ length: 10 }, (_, i) => (36 + i).toString());
  
  const priceRanges = [
    { label: '₺1000 - ₺1500', value: '1000-1500' },
    { label: '₺1500 - ₺2000', value: '1500-2000' },
    { label: '₺2000 - ₺3000', value: '2000-3000' },
    { label: '₺3000 - ₺4000', value: '3000-4000' },
    { label: '₺4000 - ₺5000', value: '4000-5000' },
    { label: '₺5000+', value: '5000-plus' }
  ];

  const sortOptions = [
    { label: 'En Yeniler', value: 'newest' },
    { label: 'Fiyat: Düşükten Yükseğe', value: 'price-low' },
    { label: 'Fiyat: Yüksekten Düşüğe', value: 'price-high' },
    { label: 'İsim: A-Z', value: 'name-asc' },
    { label: 'İsim: Z-A', value: 'name-desc' }
  ];

  const handleCategoryToggle = (category, subcategory = null) => {
    let newCategories;
    const fullCategory = subcategory ? `${category}-${subcategory}` : category;
    
    if (activeFilters.category.includes(fullCategory)) {
      newCategories = activeFilters.category.filter(c => c !== fullCategory);
    } else {
      newCategories = [...activeFilters.category, fullCategory];
    }
    
    handleFilterChange('category', newCategories);
  };

  const handleSizeToggle = (size) => {
    const newSizes = activeFilters.size.includes(size)
      ? activeFilters.size.filter(s => s !== size)
      : [...activeFilters.size, size];
    
    handleFilterChange('size', newSizes);
  };

  const handleFilterChange = (type, value) => {
    const newFilters = { ...activeFilters, [type]: value };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    return activeFilters.size.length + (activeFilters.priceRange !== 'all' ? 1 : 0) + activeFilters.category.length;
  };

  const clearFilters = () => {
    setActiveFilters({
      category: [],
      size: [],
      priceRange: 'all',
      sort: 'newest'
    });
    onFilterChange({
      category: [],
      size: [],
      priceRange: 'all',
      sort: 'newest'
    });
  };

  return (
    <>
      <div className="sticky top-24 z-30 w-full bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtrele
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>

              {/* Active Filter Tags */}
              <div className="hidden md:flex items-center gap-2">
                {activeFilters.size.map(size => (
                  <Badge
                    key={size}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {size}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleSizeToggle(size)}
                    />
                  </Badge>
                ))}
                {activeFilters.priceRange !== 'all' && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {priceRanges.find(r => r.value === activeFilters.priceRange)?.label}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleFilterChange('priceRange', 'all')}
                    />
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-red-500 hover:text-red-600"
                >
                  Filtreleri Temizle
                </Button>
              )}
              <Select
                value={activeFilters.sort}
                onValueChange={(value) => handleFilterChange('sort', value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-xl shadow-xl p-6 h-[85vh] overflow-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filtreler</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Category Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs mr-2">
                      Kategoriler
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <div key={category.value} className="space-y-2">
                        <Button
                          variant={activeFilters.category.includes(category.value) ? "default" : "outline"}
                          className={`w-full justify-between ${
                            activeFilters.category.includes(category.value)
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'hover:bg-purple-50'
                          }`}
                          onClick={() => handleCategoryToggle(category.value)}
                        >
                          {category.name}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                        <div className="grid grid-cols-2 gap-1 pl-2">
                          {category.items.map((item) => (
                            <Button
                              key={item}
                              variant={activeFilters.category.includes(`${category.value}-${item}`) ? "default" : "ghost"}
                              className={`justify-start text-sm h-8 ${
                                activeFilters.category.includes(`${category.value}-${item}`)
                                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                  : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                              }`}
                              onClick={() => handleCategoryToggle(category.value, item)}
                            >
                              {item}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Size Filters */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">Kıyafet</span>
                    Beden
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {clothingSizes.map(size => (
                      <Button
                        key={size}
                        variant={activeFilters.size.includes(size) ? "default" : "outline"}
                        className={`h-12 ${
                          activeFilters.size.includes(size)
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'hover:bg-blue-50'
                        }`}
                        onClick={() => handleSizeToggle(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Shoe Sizes */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-2">Ayakkabı</span>
                    Numara
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {shoeSizes.map(size => (
                      <Button
                        key={size}
                        variant={activeFilters.size.includes(size) ? "default" : "outline"}
                        className={`h-12 ${
                          activeFilters.size.includes(size)
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'hover:bg-blue-50'
                        }`}
                        onClick={() => handleSizeToggle(size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-2">Fiyat</span>
                    Aralığı
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {priceRanges.map(range => (
                      <Button
                        key={range.value}
                        variant={activeFilters.priceRange === range.value ? "default" : "outline"}
                        className={`justify-start h-12 ${
                          activeFilters.priceRange === range.value
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'hover:bg-blue-50'
                        }`}
                        onClick={() => handleFilterChange('priceRange', range.value)}
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {getActiveFiltersCount() > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Aktif Filtreler</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.category.map(cat => (
                      <Badge
                        key={cat}
                        variant="secondary"
                        className="flex items-center gap-1 bg-purple-100 text-purple-700"
                      >
                        {cat.split('-')[1] || cat}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleCategoryToggle(cat)}
                        />
                      </Badge>
                    ))}
                    {activeFilters.size.map(size => (
                      <Badge
                        key={size}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {size}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleSizeToggle(size)}
                        />
                      </Badge>
                    ))}
                    {activeFilters.priceRange !== 'all' && (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {priceRanges.find(r => r.value === activeFilters.priceRange)?.label}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => handleFilterChange('priceRange', 'all')}
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Apply Filters Button */}
              <div className="sticky bottom-0 bg-white pt-6 pb-2 mt-6">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="w-1/3 h-12"
                    onClick={clearFilters}
                  >
                    Temizle
                  </Button>
                  <Button
                    className="w-2/3 h-12 bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {getActiveFiltersCount() > 0 ? `${getActiveFiltersCount()} Filtreyi Uygula` : 'Filtreleri Uygula'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductsFilter;