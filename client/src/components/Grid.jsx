import React, { useContext, useEffect, useState } from "react";
import GameOver from "./GameOver";
import { SocketContext } from "../hooks/SocketContext";

export default function Grid(props) {
  const connected = props.connected;
  const name = props.name;
  const roomNumber = props.roomNumber;
  const XO = props.XO;
  const [box, setBox] = useState(Array(props.grid).fill(99));
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (!socket) return;
    socket.on("playerJoined", ({ message }) => {
      console.log(message);
      alert(message);
    });

    socket.on("error", ({ message }) => {
      alert(`Error: ${message}`);
    });

    socket.on("xMove", ({ id }) => {
      fillBoxes(id, "X");
      console.log(box);
    });

    socket.on("oMove", ({ id }) => {
      fillBoxes(id, "O");
      console.log(box);
    });

    return () => {
      socket.off("error");
      socket.off("playerJoined");
      socket.off("xMove");
      socket.off("oMove");
    };
  }, [socket, box]);

  const handleClick = (e) => {
    const id = e.target.id;
    if (box[id] !== 99) return;
    if (XO === "X") {
      socket.emit("xMove", { id, roomNumber });
    } else if (XO === "O") {
      socket.emit("oMove", { id, roomNumber });
    }
    fillBoxes(id, XO);
  };

  const fillBoxes = (id, team) => {
    if (box[id] !== 99) return;
    const boxElement = document.getElementById(id);
    if (team === "X") {
      setBox((prevBox) => {
        const newBox = [...prevBox];
        newBox[id] = 1;
        return newBox;
      });
      boxElement.innerText = "X";
    } else if (team === "O") {
      boxElement.innerText = "O";
      setBox((prevBox) => {
        const newBox = [...prevBox];
        newBox[id] = 2;
        return newBox;
      });
    }
  };

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

      <div className={props.gName}>
        {box.map((_, i) => (
          <div
            key={i}
            className={props.bName}
            id={i}
            onClick={handleClick}
          ></div>
        ))}
      </div>
    </div>
  );
}
