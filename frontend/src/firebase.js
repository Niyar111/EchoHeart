import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP_qAqJ1XKHEDjyBhyIdu4pCVdegq4sck",
  authDomain: "echoheart-f3d11.firebaseapp.com",
  projectId: "echoheart-f3d11",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);