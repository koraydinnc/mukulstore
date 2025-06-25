"use client"

import { useState, useCallback, memo, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, SlidersHorizontal, X, Check, RefreshCcw } from 'lucide-react';
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


const ProductsFilter = forwardRef(({ onFilterChange, categories, totalResults = 0 }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    size: [],
    priceRange: 'all',
    sort: 'newest'
  });

  const clothingSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
  
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

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(activeFilters);
    }
  }, [activeFilters, onFilterChange]);

  const handleFilterChange = useCallback((type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  }, []);

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

  const getActiveFiltersCount = () => {
    return activeFilters.size.length + (activeFilters.priceRange !== 'all' ? 1 : 0) + activeFilters.category.length;
  };

  const clearFilters = useCallback(() => {
    setActiveFilters({
      category: [],
      size: [],
      priceRange: 'all',
      sort: 'newest'
    });
  }, []);

  // Expose clearFilters method to parent via ref
  useImperativeHandle(ref, () => ({
    clearFilters
  }), [clearFilters]);

  return (
    <>
      <div className="sticky top-24 z-30 w-full bg-white/95 backdrop-blur-sm border-b shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-6 gap-4">
            {/* Left Section - Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all duration-300"
              >
                <SlidersHorizontal className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Filtrele & Sırala</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge className="ml-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>

              {/* Active Filter Tags */}
              <div className="flex flex-wrap items-center gap-2">
                {activeFilters.size.map(size => (
                  <motion.div
                    key={size}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs font-medium">Beden: {size}</span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                        onClick={() => handleSizeToggle(size)}
                      />
                    </Badge>
                  </motion.div>
                ))}
                {activeFilters.category.map(cat => (
                  <motion.div
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-purple-100 text-purple-800 hover:bg-purple-200 px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs font-medium">
                        {categories.find(c => c.id.toString() === cat.split('-')[0])?.name || cat}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                        onClick={() => handleCategoryToggle(cat)}
                      />
                    </Badge>
                  </motion.div>
                ))}
                {activeFilters.priceRange !== 'all' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1.5 rounded-full"
                    >
                      <span className="text-xs font-medium">
                        {priceRanges.find(r => r.value === activeFilters.priceRange)?.label}
                      </span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-red-500 transition-colors"
                        onClick={() => handleFilterChange('priceRange', 'all')}
                      />
                    </Badge>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Section - Results & Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                {getActiveFiltersCount() > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg px-4 py-2"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Temizle
                    </Button>
                    <Separator orientation="vertical" className="h-6" />
                  </>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {totalResults.toLocaleString()} ürün bulundu
                  </span>
                </div>
              </div>
              
              <Select
                value={activeFilters.sort}
                onValueChange={(value) => handleFilterChange('sort', value)}
              >
                <SelectTrigger className="w-[220px] bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl h-12">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Sıralama seçin" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 shadow-xl">
                  {sortOptions.map(option => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="hover:bg-blue-50 rounded-lg m-1"
                    >
                      <div className="flex items-center gap-2">
                        <Check className={`h-4 w-4 ${activeFilters.sort === option.value ? 'text-blue-600' : 'text-transparent'}`} />
                        <span>{option.label}</span>
                      </div>
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
              className="fixed inset-0 bg-black/70 z-40 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl border-t-4 border-blue-500 h-[85vh] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)'
              }}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10" style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)'
              }}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <SlidersHorizontal className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">Filtreler & Sıralama</h2>
                      <p className="text-sm text-gray-600">
                        {getActiveFiltersCount()} filtre aktif • {totalResults} ürün
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-red-50 hover:text-red-500 rounded-xl w-12 h-12"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                {/* Quick Actions */}
                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="bg-red-50 hover:bg-red-100 text-red-600 border-red-200 rounded-xl"
                  >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Tüm Filtreleri Temizle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200 rounded-xl"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Filtreleri Uygula
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)] bg-gray-50/30">

              {/* Category Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs mr-2">
                      Kategoriler
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories?.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <Button
                          variant={activeFilters.category.includes(category.id.toString()) ? "default" : "outline"}
                          className={`w-full justify-between ${
                            activeFilters.category.includes(category.id.toString())
                              ? 'bg-purple-600 hover:bg-purple-700'
                              : 'hover:bg-purple-50'
                          }`}
                          onClick={() => handleCategoryToggle(category.id.toString())}
                        >
                          {category.name}
                          {category.subCategories?.length > 0 && (
                            <ChevronDown className="h-4 w-4 ml-2" />
                          )}
                        </Button>
                        
                        {category.subCategories?.length > 0 && (
                          <div className="grid grid-cols-2 gap-1 pl-2">
                            {category.subCategories.map((sub) => (
                              <Button
                                key={sub.id}
                                variant={activeFilters.category.includes(`${category.id}-${sub.id}`) ? "default" : "ghost"}
                                className={`justify-start text-sm h-8 ${
                                  activeFilters.category.includes(`${category.id}-${sub.id}`)
                                    ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                    : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                                }`}
                                onClick={() => handleCategoryToggle(category.id.toString(), sub.id.toString())}
                              >
                                {sub.name}
                              </Button>
                            ))}
                          </div>
                        )}
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
              <div className="sticky bottom-0 bg-white pt-6 pb-2 mt-6 border-t border-gray-200" style={{
                background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
                boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
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
});

ProductsFilter.displayName = 'ProductsFilter';

export default memo(ProductsFilter);