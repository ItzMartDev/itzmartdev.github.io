# Chat GitHub

Um chat em tempo real integrado com autenticação do GitHub, hospedado no GitHub Pages.

## Configuração

1. Configure as seguintes variáveis de ambiente no GitHub Actions Secrets:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `GITHUB_CLIENT_ID`

2. Configure o Firebase:
   - Crie um projeto no Firebase Console
   - Habilite a autenticação com GitHub
   - Configure o Firestore Database
   - Configure as regras de segurança do Firestore

3. Configure o OAuth App no GitHub:
   - Vá para Settings > Developer settings > OAuth Apps
   - Crie um novo OAuth App
   - Configure a URL de callback para seu domínio

## Tecnologias Utilizadas

- Firebase (Authentication, Firestore)
- GitHub OAuth
- HTML5
- CSS3
- JavaScript (ES6+)

## Como Usar

1. Acesse o site
2. Faça login com sua conta GitHub
3. Comece a conversar!

## Licença

MIT 