import { auth, db } from './firebase-config.js';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const userList = document.getElementById('userList');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');

let currentUser = null;
let username = '';

// Gerenciar login
loginButton.addEventListener('click', () => {
    const inputUsername = usernameInput.value.trim();
    if (inputUsername) {
        username = inputUsername;
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
        initializeChat();
    } else {
        alert('Por favor, digite um nome de usuário válido');
    }
});

// Inicializar chat
function initializeChat() {
    // Adicionar usuário à lista de usuários online
    const userRef = doc(db, 'users', username);
    setDoc(userRef, {
        online: true,
        lastSeen: serverTimestamp()
    });

    // Ouvir mudanças na lista de usuários
    const usersQuery = query(collection(db, 'users'));
    onSnapshot(usersQuery, (snapshot) => {
        userList.innerHTML = '';
        snapshot.forEach((doc) => {
            const userData = doc.data();
            if (userData.online) {
                const userElement = document.createElement('li');
                userElement.textContent = doc.id;
                userList.appendChild(userElement);
            }
        });
    });

    // Ouvir novas mensagens
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp'));
    onSnapshot(messagesQuery, (snapshot) => {
        messagesDiv.innerHTML = '';
        snapshot.forEach((doc) => {
            const message = doc.data();
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <strong>${message.userName}:</strong> ${message.text}
            `;
            messagesDiv.appendChild(messageElement);
        });
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}

// Enviar mensagem
sendButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message && username) {
        try {
            await addDoc(collection(db, 'messages'), {
                text: message,
                userName: username,
                timestamp: serverTimestamp()
            });
            messageInput.value = '';
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }
});

// Enviar mensagem com Enter
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Gerenciar desconexão
window.addEventListener('beforeunload', async () => {
    if (username) {
        const userRef = doc(db, 'users', username);
        await setDoc(userRef, {
            online: false,
            lastSeen: serverTimestamp()
        });
    }
}); 