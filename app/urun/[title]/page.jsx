import { generateProductMetadata } from '@/app/utils/metadata'
import UrunDetay from '@/app/components/UrunDetay'

// Dinamik metadata oluşturma
export async function generateMetadata({ params }) {
  // Ürün verilerini API'den al
  const product = await fetchProduct(params.title)
  return generateProductMetadata(product)
}

export default async function UrunPage({ params }) {
  const data = await fetchProduct(params.title)
  
  return <UrunDetay data={data} />
}

// Ürün verilerini getiren fonksiyon
async function fetchProduct(title) {
  // API çağrısı yapılacak
  return data
}
