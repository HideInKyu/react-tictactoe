import React, { useContext, useEffect, useState } from "react";
import GameOver from "./GameOver";
import { SocketContext } from "../hooks/SocketContext";

export default function Grid(props) {
  const connected = props.connected;
  const name = props.name;
  const roomNumber = props.roomNumber;
  return (
    <div>
      {connected ? (
        <>
          <h1>Hello {name}!</h1>
          <h2>Room: {roomNumber}</h2>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
