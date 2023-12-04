import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDCLNCh-PZtHpEoTf6qVwJtUOXJ4nEcPeM",
  authDomain: "drop-box-clone-338a2.firebaseapp.com",
  projectId: "drop-box-clone-338a2",
  storageBucket: "drop-box-clone-338a2.appspot.com",
  messagingSenderId: "903119087138",
  appId: "1:903119087138:web:8e4b9bbcfa919876ba0c7b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
