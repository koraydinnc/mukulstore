"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import { CircleCheck, ShoppingBag, User, CreditCard } from 'lucide-react'

const Breadcrumb = () => {
  const steps = [
    { label: 'Sepetim', path: '/Sepetim', icon: <ShoppingBag /> },
    { label: 'Bilgiler', path: '/Sepetim/Bilgiler', icon: <User /> },
    { label: 'Ödeme', path: '/Sepetim/Odeme', icon: <CreditCard /> },
    { label: 'Onay', path: '/Sepetim/Onay', icon: <CircleCheck /> }
  ]

  const pathname = usePathname()

  // En uzun eşleşen path'i bul
  const currentStepIndex = steps
    .map((step, index) => ({ index, match: pathname.startsWith(step.path) }))
    .filter(step => step.match)
    .map(step => step.index)
    .pop() ?? -1

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex
          const isCurrent = index === currentStepIndex

          return (
            <div key={step.path} className="flex items-center">
              {index > 0 && (
                <div className={`h-px w-16 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
              <div className="flex items-center">
                {isActive ? (
                  <CircleCheck className="h-6 w-6 text-green-500" />
                ) : (
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-sm
                    ${isCurrent ? 'bg-blue-500 text-white' : 'border-2 border-gray-200 text-gray-400'}`}
                  >
                    {index + 1}
                  </div>
                )}
                <span className={`ml-2 text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Breadcrumb
