"use client"
import Link from 'next/link'
import { ChevronRight, CreditCard, Home, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)

  return (
    <nav className="flex items-center text-sm text-gray-500 space-x-1 sm:space-x-24 py-2">
      <Link 
        href="/" 
        className="hover:text-gray-700 flex items-center min-w-fit"
      >
        <Home className="h-4 w-4 sm:hidden" />
        <span className="hidden sm:inline">Ana Sayfa</span>
      </Link>

      {paths.map((path, i) => (
        <div key={path} className="flex items-center space-x-4 sm:space-x-2">
          <ChevronRight className="h-4 w-4 mx-1 sm:mx-2 flex-shrink-0" />
          <Link 
            href={`/${paths.slice(0, i + 1).join('/')}`}
            className={`truncate max-w-[120px] sm:max-w-full flex items-center gap-1
              ${i === paths.length - 1 
                ? 'text-blue-600 font-medium' 
                : 'hover:text-gray-700'}
            `}
          >
            {path === 'Sepetim' ? (
              <>
                <ShoppingBag className="h-4 w-4 sm:hidden" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">{path}</span>
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 sm:hidden" />
                <span className="overflow-hidden text-ellipsis whitespace-nowrap">{path}</span>
              </>
            )}
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
