import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// As credenciais são gerenciadas através do GitHub Secrets
const app = initializeApp({
    apiKey: "${{ secrets.FIREBASE_API_KEY }}",
    authDomain: "${{ secrets.FIREBASE_AUTH_DOMAIN }}",
    projectId: "${{ secrets.FIREBASE_PROJECT_ID }}",
    storageBucket: "${{ secrets.FIREBASE_STORAGE_BUCKET }}",
    messagingSenderId: "${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}",
    appId: "${{ secrets.FIREBASE_APP_ID }}"
});

const db = getFirestore(app);

// Habilitar persistência offline
try {
    await enableIndexedDbPersistence(db);
} catch (err) {
    console.error("Erro ao habilitar persistência:", err);
}

export { db }; 