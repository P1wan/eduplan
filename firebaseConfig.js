import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'; // 1. Importar o serviço de autenticação

const firebaseConfig = {
    apiKey: "AIzaSyBsreZBVB5ypBKo9dHSBUPUqb4iKQ8qEho",
    authDomain: "eduplan-702e3.firebaseapp.com",
    projectId: "eduplan-702e3",
    storageBucket: "eduplan-702e3.firebasestorage.app",
    messagingSenderId: "1082238804412",
    appId: "1:1082238804412:web:92fed990c46227711d0bb9",
    measurementId: "G-3XPH5YX054"
  };

if (!firebase.apps.length){
 firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth(); // 2. Inicializar e preparar o auth para exportação

// 3. HABILITAR A PERSISTÊNCIA OFFLINE (a mágica acontece aqui)
db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
        // Provavelmente múltiplas abas abertas, o que é raro em mobile
        console.log("Persistência falhou, talvez múltiplas abas?");
    } else if (err.code == 'unimplemented') {
        // O dispositivo não suporta
        console.log("Persistência não é suportada neste dispositivo.");
    }
});

export { db, auth }; // 4. Exportar ambos, db e auth