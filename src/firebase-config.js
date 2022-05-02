import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCnJhzodBEU9SNKlSkalMtrc19I26tOGkg",
    authDomain: "huff-jarvis.firebaseapp.com",
    databaseURL: "https://huff-jarvis-default-rtdb.firebaseio.com",
    projectId: "huff-jarvis",
    storageBucket: "huff-jarvis.appspot.com",
    messagingSenderId: "665598426021",
    appId: "1:665598426021:web:accb040ba630d8ce0d864c",
    measurementId: "G-RRJ32NWW4B"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);