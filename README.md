# Infinite Tic-Tac-Toe 🟢❌

![Infinite Tic-Tac-Toe](https://infinite-tic-tac-toe-front.vercel.app/logo.png)

**Infinite Tic-Tac-Toe** é um jogo da velha multiplayer online com algumas mecânicas especiais, feito com **Next.js**, **React** e **Socket.IO**. Você pode criar salas públicas ou privadas e jogar em tempo real com amigos.  

O jogo inclui:
- Criação de salas públicas ou privadas  
- Entrar em salas existentes ou aleatórias  
- Sistema de turnos com limite de 3 peças por jogador  
- Movimento “desaparecer” das peças antigas ao colocar novas  
- Revanche e reset de partidas  

## 🔗 Acesse o jogo
[Infinite Tic-Tac-Toe Online](https://infinite-tic-tac-toe-front.vercel.app/)

---

## 🛠 Tecnologias usadas
- [Next.js](https://nextjs.org/) (React + SSR)  
- [React.js](https://reactjs.org/)  
- [Socket.IO](https://socket.io/) para comunicação em tempo real  
- [Express](https://expressjs.com/) + Node.js no backend  
- Tailwind CSS para estilização  

---

## ⚡ Funcionalidades

### Cliente
- Interface responsiva com React  
- Criação/entrada de salas em tempo real  
- Indicação de turnos e vencedor  
- Mensagens quando outro jogador entra ou sai da sala  

### Servidor
- Gerenciamento de salas públicas e privadas  
- Sistema de turnos e movimentos do jogo  
- Emissão de eventos `room-created`, `room-joined`, `move-made`, `player-left` e `rematch-started`  
- Lógica de “desaparecer” de peças antigas após 3 movimentos  

---

## 💻 Como rodar localmente

### Requisitos
- Node.js >= 18  
- npm ou yarn  

### Passos

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/infinite-tic-tac-toe.git
cd infinite-tic-tac-toe
