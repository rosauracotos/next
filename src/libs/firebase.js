import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyDndXrRF5dxTUGuUQDGVFpIL9NdnBItUbY",
    authDomain: "libreria-a4e84.firebaseapp.com",
    projectId: "libreria-a4e84",
    storageBucket: "libreria-a4e84.firebasestorage.app",
    messagingSenderId: "853113202790",
    appId: "1:853113202790:web:f9eef62cad9a68f4a6e5a7",
    measurementId: "G-3RBX7SST20"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



export  { app, db };