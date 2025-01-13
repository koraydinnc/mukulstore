"use client"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { isAuthenticated } = useSelector((state) => state.admin)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/admin/login')
    }
    else {
      router.replace('/admin/dashboard')
    }
  }, [isAuthenticated, router]) // `isAuthenticated` ve `router`'ı bağımlılığa ekledik.


  return (

    <div>

       <SEO
        title="Anasayfa"
        description="Mukul Store | Anasayfa"
        keywords="anasayfa, ayakkabı,giyim,mukul, mukulstore, mukul store, ürünler"
        image="/logo.png"
        url="https://mukulstore.com"
      />
    </div>
  )
}
