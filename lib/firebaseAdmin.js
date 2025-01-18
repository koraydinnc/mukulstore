import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Service account JSON dosyasını import et
const serviceAccount = require('./accountKey.json');

// Firebase Admin SDK'yı başlat
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "mukul-store.firebasestorage.app"
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error.stack);
  }
}

// Storage bucket'ı al
const bucket = admin.storage().bucket();

export { bucket };
