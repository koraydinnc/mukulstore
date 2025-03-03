import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, X } from 'lucide-react';

const WhatsAppContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactInfo = {
    whatsapp: "+90 541 806 61 55",
    phone: "+90 541 806 61 55",
    email: "mukulstore@gmail.com",
    address: "Çay, özgür kundura, Ünye Cd. No:17, 55600 Terme/Samsun"
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 left-4 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>

      {/* Contact Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              className="fixed left-0 bottom-0 z-50 w-full sm:w-[400px] bg-white rounded-tr-2xl rounded-br-2xl shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">İletişim</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* WhatsApp */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <div className="bg-green-500 text-white p-3 rounded-full">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">{contactInfo.whatsapp}</p>
                    </div>
                  </motion.a>

                  {/* Phone */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-sm text-gray-600">{contactInfo.phone}</p>
                    </div>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <div className="bg-purple-500 text-white p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">E-posta</p>
                      <p className="text-sm text-gray-600">{contactInfo.email}</p>
                    </div>
                  </motion.a>

                  {/* Address */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg"
                  >
                    <div className="bg-orange-500 text-white p-3 rounded-full">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-sm text-gray-600">{contactInfo.address}</p>
                    </div>
                  </motion.div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                  7/24 Müşteri Hizmetleri
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppContact;
