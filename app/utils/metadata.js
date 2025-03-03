export function generateProductMetadata(product) {
  return {
    title: product.title,
    description: product.description,
    keywords: [`${product.title}`, 'ayakkabı', 'mukul store', `${product.title} fiyat`],
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.images.map(img => ({
        url: `/uploads/${img}`,
        alt: product.title,
      })),
      type: 'product',
      priceAmount: product.discountedPrice || product.price,
      priceCurrency: 'TRY',
      availability: product.stock > 0 ? 'in stock' : 'out of stock',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: `/uploads/${product.images[0]}`,
    },
  }
}
