import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket, 
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://mukul-store.firebasestorage.app");

export { storage };
