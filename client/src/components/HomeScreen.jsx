import React from "react";

export default function HomeScreen() {
  return (
    <div>
      <h1>Online Tic-Tac-Toe using React</h1>
      <p>Roy Bae</p>
      <div className="playerName">
        <label for="playerName">Player Name:</label>
        <input type="text" id="playerName" />
      </div>
      <div className="create">
        <label for="create">Room Id:</label>
        <input type="text" id="create" />
        <button className="btn">Create Room</button>
      </div>
      <p>or</p>
      <div className="join">
        <label for="join">Room Id:</label>
        <input type="text" id="join" />
        <button className="btn">Join Room</button>
      </div>
    </div>
  );
}
