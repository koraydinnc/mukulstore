import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIFhWlkLP4rvRz-7phrSchM3nwD7p1u8Y",
  authDomain: "mukul-store.firebaseapp.com",
  projectId: "mukul-store",
  storageBucket: "mukul-store.firebaseapp.com", // Doğru bucket adresi
  messagingSenderId: "684242592283",
  appId: "1:684242592283:web:cc3937fb98faad64544ebe"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const storage = getStorage(app);

export { storage };
