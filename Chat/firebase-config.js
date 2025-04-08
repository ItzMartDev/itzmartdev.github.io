import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import firebaseConfig from './firebase-config-generated.js';

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Habilitar persistência offline com tratamento de erro
try {
    await enableIndexedDbPersistence(db);
} catch (err) {
    if (err.code === 'failed-precondition') {
        console.warn('Persistência múltipla não suportada');
    } else if (err.code === 'unimplemented') {
        console.warn('Navegador não suporta persistência');
    }
}

export { db }; 