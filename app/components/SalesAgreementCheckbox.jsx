'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function SalesAgreementCheckbox({ isChecked, onChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const agreementContent = (
    <div className="space-y-6">
      <p className="font-medium">
        Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca düzenlenmiştir. Mukul Store ("Satıcı") ile müşteri ("Alıcı") arasında şu şartlar dahilinde bir satış söz konusu olmaktadır:
      </p>
      
      {/* Agreement sections */}
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Sözleşmenin Konusu</h3>
          <p>Bu sözleşme, Alıcı'nın Mukul Store'dan elektronik ortamda sipariş verdiği ürün/hizmetlerin teslimi ve ilgili tarafların hak ve yükümlülüklerini kapsar.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Ürün/Hizmet Bilgileri</h3>
          <p>Sipariş verilen ürünler, web sitesinde belirtilen özelliklere uygun olarak Alıcı'ya teslim edilir.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Cayma Hakkı</h3>
          <p>Alıcı, ürünü teslim aldıktan sonraki 14 gün içinde cayma hakkını kullanabilir.</p>
        </div>

        {/* ... diğer bölümler ... */}
      </div>
    </div>
  );

  return (
    <div className="flex items-start gap-2">
      <div className="flex items-center h-6 flex-shrink-0">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          required
        />
      </div>
      <div className="text-sm">
        <span className="text-gray-700">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-blue-600 hover:underline inline-flex items-center"
          >
            Mesafeli Satış Sözleşmesi
          </button>
          'ni okudum ve kabul ediyorum.
        </span>
      </div>

      {/* Agreement Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-lg shadow-xl flex flex-col max-h-[80vh] md:max-h-[90vh]">
                  <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-lg md:text-xl font-semibold">
                      Mesafeli Satış Sözleşmesi
                    </h2>
                    <button 
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X className="h-5 w-5 md:h-6 md:w-6" />
                    </button>
                  </div>
                  <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar">
                    <div className="text-sm md:text-base">
                      {agreementContent}
                    </div>
                  </div>
                  <div className="border-t p-4 sticky bottom-0 bg-white">
                    <button
                      onClick={() => {
                        onChange(true);
                        setIsModalOpen(false);
                      }}
                      className="w-full md:w-auto float-right bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                    >
                      Kabul Et ve Kapat
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
