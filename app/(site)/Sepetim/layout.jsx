"use client"
import Breadcrumb from '@/app/components/Breadcrumb'
import { usePathname } from 'next/navigation'

export default function CartLayout({ children }) {
  const pathname = usePathname()
  const isPaymentPage = pathname === '/Sepetim/Odeme'

  if (!isPaymentPage) {
    return children
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8">
        <div className="order-2 sm:order-1">

          {children}
        </div>
      </div>
    </div>
  )
}

const CartSummary = () => {
  return (
    <div className="sticky top-6">
      {/* Copy the cart content from CartPage component */}
      <iframe src="/Sepetim" className="w-full h-[calc(100vh-6rem)] border-none" />
    </div>
  )
}
