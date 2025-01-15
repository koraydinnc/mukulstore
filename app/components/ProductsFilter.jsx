import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Slider, Checkbox, Button, Badge } from "antd";
import { BookMarkedIcon } from 'lucide-react';

const ProductsFilter = ({ onFilterChange, categories }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    categories: [],
    sizes: [],
    inStock: false,
    onSale: false,
  });

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      categories: [],
      sizes: [],
      inStock: false,
      onSale: false,
    });
    onFilterChange?.({});
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.categories.length) count++;
    if (filters.sizes.length) count++;
    if (filters.inStock) count++;
    if (filters.onSale) count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) count++;
    return count;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Filtrele</h2>
        {getActiveFilterCount() > 0 && (
          <Button
            type="text"
            icon={<BookMarkedIcon className="w-5 h-5 text-red-500" />}
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700"
          >
            Filtreleri Temizle
          </Button>
        )}
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="priceRange">
          <AccordionTrigger>Fiyat Aralığı</AccordionTrigger>
          <AccordionContent>
            <Slider
              range
              min={0}
              max={5000}
              value={filters.priceRange}
              onChange={(value) => handleFilterChange("priceRange", value)}
              tooltip={{ formatter: (value) => `${value}₺` }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{filters.priceRange[0]}₺</span>
              <span>{filters.priceRange[1]}₺</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>Bedenler</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Badge
                  key={size}
                  color={filters.sizes.includes(size) ? "blue" : "gray"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newSizes = filters.sizes.includes(size)
                      ? filters.sizes.filter((s) => s !== size)
                      : [...filters.sizes, size];
                    handleFilterChange("sizes", newSizes);
                  }}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="categories">
          <AccordionTrigger>Kategoriler</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <Badge
                  key={category.id}
                  color={filters.categories.includes(category.id) ? "blue" : "gray"}
                  className="cursor-pointer"
                  onClick={() => {
                    const newCategories = filters.categories.includes(category.id)
                      ? filters.categories.filter((c) => c !== category.id)
                      : [...filters.categories, category.id];
                    handleFilterChange("categories", newCategories);
                  }}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="otherFilters">
          <AccordionTrigger>Diğer Filtreler</AccordionTrigger>
          <AccordionContent>
            <Checkbox
              checked={filters.inStock}
              onChange={(e) => handleFilterChange("inStock", e.target.checked)}
            >
              Sadece Stokta Olanlar
            </Checkbox>
            <Checkbox
              checked={filters.onSale}
              onChange={(e) => handleFilterChange("onSale", e.target.checked)}
              className="mt-2"
            >
              İndirimdekiler
            </Checkbox>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {getActiveFilterCount() > 0 && (
        <div className="mt-6">
          <h3 className="font-medium text-gray-900">Aktif Filtreler</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.categories.length > 0 && (
              <Badge color="blue">{filters.categories.length} Kategori</Badge>
            )}
            {filters.sizes.length > 0 && (
              <Badge color="blue">{filters.sizes.length} Beden</Badge>
            )}
            {filters.inStock && <Badge color="blue">Stokta</Badge>}
            {filters.onSale && <Badge color="blue">İndirimli</Badge>}
            {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) && (
              <Badge color="blue">
                {filters.priceRange[0]}₺ - {filters.priceRange[1]}₺
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsFilter;
