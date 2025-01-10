"use client"
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AdminLayout from './layout'

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
    <div></div>
  )
}
