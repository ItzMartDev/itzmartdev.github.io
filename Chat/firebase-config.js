import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "sua-api-key",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "seu-auth-domain",
    projectId: process.env.FIREBASE_PROJECT_ID || "seu-project-id",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "seu-storage-bucket",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "seu-messaging-sender-id",
    appId: process.env.FIREBASE_APP_ID || "seu-app-id"
};

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