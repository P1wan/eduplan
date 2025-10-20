import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBsreZBVB5ypBKo9dHSBUPUqb4iKQ8qEho",
  authDomain: "eduplan-702e3.firebaseapp.com",
  projectId: "eduplan-702e3",
  storageBucket: "eduplan-702e3.firebasestorage.app",
  messagingSenderId: "1082238804412",
  appId: "1:1082238804412:web:92fed990c46227711d0bb9",
  measurementId: "G-3XPH5YX054"
};

// Inicializa o Firebase apenas se ainda não foi inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Exporta as instâncias dos serviços que vamos usar no app
export const auth = firebase.auth();
export const db = firebase.firestore();