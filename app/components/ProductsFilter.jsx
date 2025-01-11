import React, { useState } from 'react'
import { Slider, Checkbox, Collapse, Button, Badge, Divider, Tag } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const ProductsFilter = ({ onFilterChange, categories }) => {
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    categories: [],
    sizes: [],
    inStock: false,
    onSale: false,
  })

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "36", "37", "38", "39", "40", "41", "42", "43", "44"]

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 5000],
      categories: [],
      sizes: [],
      inStock: false,
      onSale: false,
    })
    onFilterChange?.({})
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.categories.length) count++
    if (filters.sizes.length) count++
    if (filters.inStock) count++
    if (filters.onSale) count++
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) count++
    return count
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-screen-2xl mx-auto mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Filtrele</h2>
        {getActiveFilterCount() > 0 && (
          <Button
            type="link"
            icon={<CloseOutlined />}
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700"
          >
            Filtreleri Temizle
          </Button>
        )}
      </div>

      <Collapse accordion>
        <Panel header="Fiyat Aralığı" key="1">
          <Slider
            range
            min={0}
            max={5000}
            value={filters.priceRange}
            onChange={(value) => handleFilterChange('priceRange', value)}
            tooltip={{
              formatter: (value) => `${value}₺`
            }}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{filters.priceRange[0]}₺</span>
            <span>{filters.priceRange[1]}₺</span>
          </div>
        </Panel>

        <Panel header="Bedenler" key="2">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Tag
                key={size}
                color={filters.sizes.includes(size) ? 'blue' : 'default'}
                className="cursor-pointer hover:bg-blue-100 transition-all"
                onClick={() => {
                  const newSizes = filters.sizes.includes(size)
                    ? filters.sizes.filter(s => s !== size)
                    : [...filters.sizes, size]
                  handleFilterChange('sizes', newSizes)
                }}
              >
                {size}
              </Tag>
            ))}
          </div>
        </Panel>

        <Panel header="Kategoriler" key="3">
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <Tag
                key={category.id}
                color={filters.categories.includes(category.id) ? 'blue' : 'default'}
                className="cursor-pointer hover:bg-blue-100 transition-all"
                onClick={() => {
                  const newCategories = filters.categories.includes(category.id)
                    ? filters.categories.filter(c => c !== category.id)
                    : [...filters.categories, category.id]
                  handleFilterChange('categories', newCategories)
                }}
              >
                {category.name}
              </Tag>
            ))}
          </div>
        </Panel>

        <Panel header="Diğer Filtreler" key="4">
          <Checkbox
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            className="hover:text-blue-600 transition-all"
          >
            Sadece Stokta Olanlar
          </Checkbox>
          <br />
          <Checkbox
            checked={filters.onSale}
            onChange={(e) => handleFilterChange('onSale', e.target.checked)}
            className="hover:text-blue-600 transition-all"
          >
            İndirimdekiler
          </Checkbox>
        </Panel>
      </Collapse>

      {getActiveFilterCount() > 0 && (
        <div className="mt-4">
          <Divider />
          <h3 className="font-medium text-gray-800">Aktif Filtreler</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.categories.length > 0 && (
              <Tag color="blue" className="px-3 py-1 rounded">
                {filters.categories.length} Kategori
              </Tag>
            )}
            {filters.sizes.length > 0 && (
              <Tag color="blue" className="px-3 py-1 rounded">
                {filters.sizes.length} Beden
              </Tag>
            )}
            {filters.inStock && (
              <Tag color="blue" className="px-3 py-1 rounded">
                Stokta
              </Tag>
            )}
            {filters.onSale && (
              <Tag color="blue" className="px-3 py-1 rounded">
                İndirimli
              </Tag>
            )}
            {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 5000) && (
              <Tag color="blue" className="px-3 py-1 rounded">
                {filters.priceRange[0]}₺ - {filters.priceRange[1]}₺
              </Tag>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsFilter
