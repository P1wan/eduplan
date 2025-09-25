import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'; // 1. Importar o serviço de autenticação

const firebaseConfig = {
//informações do firebase
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
