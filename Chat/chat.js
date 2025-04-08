import { db } from './firebase-config.js';
import { 
    collection, 
    addDoc, 
    onSnapshot, 
    query, 
    orderBy, 
    serverTimestamp,
    doc,
    setDoc,
    limit
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const userList = document.getElementById('userList');
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const usernameInput = document.getElementById('usernameInput');
const loginButton = document.getElementById('loginButton');

let username = '';
let activeUsers = new Set();

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
    try {
        // Registrar usuário
        await setDoc(doc(db, 'users', username), {
            lastActive: serverTimestamp()
        });

        // Atualizar status a cada 30 segundos
        setInterval(async () => {
            try {
                await setDoc(doc(db, 'users', username), {
                    lastActive: serverTimestamp()
                });
            } catch (error) {
                console.error('Erro ao atualizar status:', error);
            }
        }, 30000);

        // Carregar mensagens
        const messagesQuery = query(
            collection(db, 'messages'),
            orderBy('timestamp', 'desc'),
            limit(50)
        );

        onSnapshot(messagesQuery, (snapshot) => {
            const messages = [];
            snapshot.forEach((doc) => {
                messages.unshift(doc.data()); // Inverter ordem para mostrar mais recentes por último
            });
            
            updateMessages(messages);
        }, (error) => {
            console.error("Erro ao carregar mensagens:", error);
        });

        // Monitorar usuários ativos
        const usersQuery = query(collection(db, 'users'));
        onSnapshot(usersQuery, (snapshot) => {
            const users = new Set();
            snapshot.forEach((doc) => {
                users.add(doc.id);
            });
            updateUserList(users);
        }, (error) => {
            console.error("Erro ao carregar usuários:", error);
        });

    } catch (error) {
        console.error('Erro ao inicializar chat:', error);
        alert('Erro ao conectar ao chat. Por favor, tente novamente.');
    }
}

function updateMessages(messages) {
    messagesDiv.innerHTML = '';
    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';
        if (message.userName === username) {
            messageElement.classList.add('my-message');
        }
        
        const time = message.timestamp ? new Date(message.timestamp.toDate()).toLocaleTimeString() : '';
        
        messageElement.innerHTML = `
            <span class="message-user">${message.userName}</span>
            <span class="message-text">${message.text}</span>
            <span class="message-time">${time}</span>
        `;
        messagesDiv.appendChild(messageElement);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateUserList(users) {
    userList.innerHTML = '';
    Array.from(users).sort().forEach(user => {
        const li = document.createElement('li');
        li.textContent = user + (user === username ? ' (você)' : '');
        if (user === username) {
            li.classList.add('current-user');
        }
        userList.appendChild(li);
    });
}

// Enviar mensagem
async function sendMessage() {
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
            alert('Erro ao enviar mensagem. Tente novamente.');
        }
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Limpar status ao sair
window.addEventListener('beforeunload', () => {
    if (username) {
        try {
            fetch(`https://${window.location.hostname}/cleanup`, {
                method: 'POST',
                body: JSON.stringify({ username }),
                keepalive: true
            });
        } catch (error) {
            console.error('Erro ao limpar status:', error);
        }
    }
}); 