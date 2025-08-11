import React, { useContext, useEffect } from "react";
import { SocketContext } from "../hooks/SocketContext";

export default function HomeScreen(props) {
  const setConnected = props.setConnected;
  const setRoomNumber = props.setRoomNumber;
  const setName = props.setName;
  const setXO = props.setXO;

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    socket.on("error", ({ message }) => {
      alert(`Error: ${message}`);
    });

    socket.on("roomCreated", ({ playerName, roomId }) => {
      alert(`Room "${roomId}" created successfully! Welcome, ${playerName}.`);
      setConnected(true);
      setName(playerName);
      setRoomNumber(roomId);
      setXO("X");
    });

    socket.on("roomJoined", ({ playerName, roomId }) => {
      alert(`Joined room "${roomId}" successfully! Welcome, ${playerName}.`);
      setConnected(true);
      setName(playerName);
      setRoomNumber(roomId);
      setXO("O");
    });
  }, [socket, setConnected, setName, setRoomNumber]);

  const handleCreate = () => {
    if (!socket) return;
    const playerName = document.getElementById("playerName").value;
    const roomId = document.getElementById("create").value;
    if (!playerName || !roomId) {
      alert("Please enter both player name and room ID.");
      return;
    }
    socket.emit("createRoom", { playerName, roomId });
  };

  const handleJoin = () => {
    if (!socket) return;
    const playerName = document.getElementById("playerName").value;
    const roomId = document.getElementById("join").value;
    if (!playerName || !roomId) {
      alert("Please enter both player name and room ID.");
      return;
    }
    socket.emit("joinRoom", { playerName, roomId });
  };

  return (
    <div className="homeScreen">
      <h1>Online Tic-Tac-Toe using React</h1>
      <p>by: Roy Bae</p>
      <div className="playerName">
        <h3>Display Name</h3>
        <label htmlFor="playerName">Player Name:</label>
        <input type="text" id="playerName" />
      </div>
      <div className="create">
        <h3>Create</h3>
        <div className="choice">
          <label htmlFor="create">Room Id:</label>
          <input type="text" id="create" />
          <button className="btn" onClick={handleCreate}>
            Create Room
          </button>
        </div>
      </div>
      <div className="join">
        <h3>Join</h3>
        <div className="choice">
          <label htmlFor="join">Room Id:</label>
          <input type="text" id="join" />
          <button className="btn" onClick={handleJoin}>
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
