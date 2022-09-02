import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCuBseBxGNTvyoWgc-PqSfvPxPATNfK5Ig",
  authDomain: "house-marketplace-app-d6f92.firebaseapp.com",
  projectId: "house-marketplace-app-d6f92",
  storageBucket: "house-marketplace-app-d6f92.appspot.com",
  messagingSenderId: "358736216058",
  appId: "1:358736216058:web:50bd55176f845fa8862e43"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore()