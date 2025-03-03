import React from 'react';
import Image from 'next/image';

const PaymentLogo = () => {
  return (
    <div className="payment-logos flex items-center justify-center py-4">
      <div className="relative h-24 w-80">
        <Image
          src="/logo_band_colored@3x.png"
          alt="iyzico ile güvenli ödeme"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default PaymentLogo;