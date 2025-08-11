import React from "react";

export default function HomeScreen() {
  return (
    <div className="homeScreen">
      <h1>Online Tic-Tac-Toe using React</h1>
      <p>by: Roy Bae</p>
      <div className="playerName">
        <h3>Display Name</h3>
        <label for="playerName">Player Name:</label>
        <input type="text" id="playerName" />
      </div>
      <div className="create">
        <h3>Create</h3>
        <div className="choice">
          <label for="create">Room Id:</label>
          <input type="text" id="create" />
          <button className="btn">Create Room</button>
        </div>
      </div>
      <div className="join">
        <h3>Join</h3>
        <div className="choice">
          <label for="join">Room Id:</label>
          <input type="text" id="join" />
          <button className="btn">Join Room</button>
        </div>
      </div>
    </div>
  );
}