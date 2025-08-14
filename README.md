# Real-Time Tic-Tac-Toe

This project is a functional, real-time, two-player Tic-Tac-Toe game.

**Live Demo:** [https://iridescent-bublanina-965e58.netlify.app/](https://iridescent-bublanina-965e58.netlify.app/)

## Project Overview

This application facilitates multiplayer Tic-Tac-Toe gameplay. Users create or join rooms to play against each other. The game state synchronizes in real-time between the two players in a room. The interface displays the game grid, player information, and game status.

## Learning Focus: Real-time Communication with Socket.IO

This project demonstrates the implementation of real-time, bidirectional communication between a client and a server using Socket.IO. The core of the application relies on a persistent connection that allows the server and clients to push messages to each other at any time.

### Server-Side: Node.js and Socket.IO

The server, built with Node.js and Express, manages game rooms and player connections.

- **Connection Handling:** The server listens for new client connections. Each connected client is a unique socket.
- **Room Management:** The server handles the creation and joining of rooms. A room can have a maximum of two players. The server maintains a `rooms` object to track players in each room.
- **Event Emitters and Listeners:** The server uses `socket.on` to listen for events from clients (e.g., `createRoom`, `joinRoom`, `xMove`, `oMove`, `reset`). It uses `socket.emit`, `io.to(roomId).emit`, and `socket.to(roomId).emit` to send messages to specific clients or all clients in a room.

### Client-Side: React, Vite, and Socket.IO Client

The client-side application, built with React and Vite, connects to the Socket.IO server to send and receive game data.

- **Socket Connection:** The `App.jsx` component establishes a connection to the server using `io(socketUrl)`. The socket instance is then provided to all child components through a React Context (`SocketContext`).
- **Context for Socket Instance:** The `SocketContext.jsx` file creates a React Context to hold the socket instance. This makes the socket accessible to any component in the component tree without prop drilling.
- **Component-Level Event Handling:** The `Grid.jsx` component uses the `useContext` hook to access the socket instance. It then uses `socket.on` within a `useEffect` hook to listen for game events from the server (e.g., `playerJoined`, `xMove`, `oMove`, `reset`). The `useEffect` hook's cleanup function removes the event listeners when the component unmounts to prevent memory leaks.
- **Emitting Events:** When a player makes a move, the `handleClick` function in `Grid.jsx` emits an event to the server using `socket.emit`. This event includes the move details and the room number.

## Project Structure

The project is organized into a `client` directory and a `server` directory.

- **`client/`**: Contains the React application.
  - **`src/components/`**: Holds the React components for the UI (e.g., `Grid.jsx`, `HomeScreen.jsx`, `GameOver.jsx`).
  - **`src/hooks/`**: Contains custom hooks, including `SocketContext.jsx` for managing the Socket.IO client instance.
  - **`src/App.jsx`**: The main application component that sets up the socket connection and routing.
- **`server/`**: Contains the Node.js server.
  - **`main.js`**: The entry point for the server, where the Express app and Socket.IO server are configured.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HideInKyu/react-tictactoe.git
    cd tic-tac-toe
    ```
2.  **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```
3.  **Install client dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Start the server:**
    ```bash
    cd server
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

2.  **Start the client:**
    ```bash
    cd ../client
    npm run dev
    ```
    The client will be available at `http://localhost:5173` or another port if 5173 is busy.