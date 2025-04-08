import { auth, db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    serverTimestamp,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    where,
    getDocs
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js';

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const userList = document.getElementById('userList');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');

let username = '';
let userRef = null;

// Gerenciar login
loginButton.addEventListener('click', async () => {
    const inputUsername = usernameInput.value.trim();
    if (inputUsername) {
        username = inputUsername;
        loginScreen.style.display = 'none';
        chatScreen.style.display = 'flex';
        await initializeChat();
    } else {
        alert('Por favor, digite um nome de usuário válido');
    }
});

// Inicializar chat
async function initializeChat() {
    // Adicionar usuário à lista de usuários online
    userRef = doc(db, 'users', username);
    await setDoc(userRef, {
        online: true,
        lastSeen: serverTimestamp(),
        timestamp: serverTimestamp()
    });

    // Atualizar status periodicamente para manter "online"
    setInterval(async () => {
        if (userRef) {
            await updateDoc(userRef, {
                lastSeen: serverTimestamp()
            });
        }
    }, 30000);

    // Limpar usuários inativos
    setInterval(async () => {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
        const q = query(collection(db, 'users'), where('lastSeen', '<', fiveMinutesAgo));
        const snapshot = await getDocs(q);
        snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });
    }, 60000);

    // Ouvir mudanças na lista de usuários
    const usersQuery = query(collection(db, 'users'), orderBy('timestamp', 'desc'));
    onSnapshot(usersQuery, (snapshot) => {
        userList.innerHTML = '';
        snapshot.forEach((doc) => {
            const userData = doc.data();
            const userElement = document.createElement('li');
            userElement.textContent = doc.id;
            if (doc.id === username) {
                userElement.textContent += ' (você)';
                userElement.classList.add('current-user');
            }
            userList.appendChild(userElement);
        });
    });

    // Ouvir novas mensagens
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const message = change.doc.data();
                const messageElement = document.createElement('div');
                messageElement.className = 'message';
                if (message.userName === username) {
                    messageElement.classList.add('my-message');
                }
                messageElement.innerHTML = `
                    <span class="message-user">${message.userName}</span>
                    <span class="message-text">${message.text}</span>
                    <span class="message-time">${formatTime(message.timestamp)}</span>
                `;
                messagesDiv.appendChild(messageElement);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
        });
    });
}

// Formatar hora da mensagem
function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
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
    if (userRef) {
        await deleteDoc(userRef);
    }
}); 