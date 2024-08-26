import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC49si304SoBEE_zY_dXeKYKBv_DX3vaLU",
    authDomain: "sistema-de-cotacoes.firebaseapp.com",
    projectId: "sistema-de-cotacoes",
    storageBucket: "sistema-de-cotacoes.appspot.com",
    messagingSenderId: "334143973971",
    appId: "1:334143973971:web:cf64a8d6f4302163b6b4a6"
  }

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
export const db = getFirestore(app);