"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "cookie_consent";

function CookiePolicyModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed w-full inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-full w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl font-bold"
          aria-label="Kapat"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Çerez Politikası</h2>
        <div className="text-gray-800 text-sm max-h-[60vh] overflow-y-auto pr-2">
          <p><b>Mukul Store</b> olarak, web sitemizde kullanıcı deneyimini geliştirmek ve hizmetlerimizi sunmak amacıyla çerezler kullanmaktayız. Çerezler, siteyi ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır.</p>
          <ul className="list-disc pl-5 my-2">
            <li>Çerezler, siteyi daha verimli kullanmanızı sağlar.</li>
            <li>Çerezler yoluyla kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak işlenmektedir.</li>
            <li>Çerez tercihlerinizi dilediğiniz zaman tarayıcı ayarlarınızdan değiştirebilirsiniz.</li>
          </ul>
          <p>Çerezler hakkında daha fazla bilgi almak veya haklarınızı öğrenmek için <a href="/Hakkimizda" className="underline text-blue-600" target="_blank">Hakkımızda</a> sayfamızı ziyaret edebilirsiniz.</p>
          <p className="mt-2">Detaylı bilgi için <b>info@mukulstore.com</b> adresinden bize ulaşabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl bg-white shadow-2xl rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 z-50 border border-gray-200 animate-fade-in">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-3xl">🍪</span>
          <div className="text-gray-800 text-sm">
            Bu site, deneyiminizi iyileştirmek için çerezleri kullanır. <span className="hidden sm:inline">Devam ederek çerez kullanımını kabul etmiş olursunuz.</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button
            onClick={handleAccept}
            className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-800 transition"
          >
            Kabul Et
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-200 transition text-center"
          >
            Daha Fazla Bilgi
          </button>
        </div>
      </div>
      <CookiePolicyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
