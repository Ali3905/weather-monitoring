import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUDeoVhGEVLbT0-Ankt3i1UI2ohk9eAh0",
  authDomain: "drip-irrigation-63da1.firebaseapp.com",
  projectId: "drip-irrigation-63da1",
  storageBucket: "drip-irrigation-63da1.appspot.com",
  messagingSenderId: "393299286864",
  appId: "1:393299286864:web:64c3d0eb759de441fdaa55"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { app, db } 