"use client"
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const Breadcrumb = () => {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500">
      <Link href="/" className="hover:text-gray-700">Ana Sayfa</Link>
      {paths.map((path, i) => (
        <div key={path} className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link 
            href={`/${paths.slice(0, i + 1).join('/')}`}
            className={`${
              i === paths.length - 1 
                ? 'text-blue-600 font-medium' 
                : 'hover:text-gray-700'
            }`}
          >
            {path === 'Sepetim' ? 'Sepetim' : 'Ödeme'}
          </Link>
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb
