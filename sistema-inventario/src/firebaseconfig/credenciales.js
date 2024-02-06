
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCTG4P_cbPSOWPBjPfinWgYxMEy3D-MULo",
  authDomain: "eu2-sistemainventario-bodega.firebaseapp.com",
  projectId: "eu2-sistemainventario-bodega",
  storageBucket: "eu2-sistemainventario-bodega.appspot.com",
  messagingSenderId: "880991662859",
  appId: "1:880991662859:web:c3e21fac423bd52768280e"
};


const appFirebase = initializeApp(firebaseConfig);

export const db = getFirestore(appFirebase)
export default appFirebase;