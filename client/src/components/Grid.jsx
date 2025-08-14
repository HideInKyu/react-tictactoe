import React, { useContext, useEffect, useState } from "react";
import GameOver from "./GameOver";
import { SocketContext } from "../hooks/SocketContext";

export default function Grid(props) {
  const connected = props.connected;
  const name = props.name;
  const roomNumber = props.roomNumber;
  const XO = props.XO;
  const [box, setBox] = useState(Array(props.grid).fill(99));
  const [turn, setTurn] = useState("X");
  const [gameWinner, setGameWinner] = useState(null);
  const [opponentName, setOpponentName] = useState(null);
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
      setTurn("O");
    });

    socket.on("oMove", ({ id }) => {
      fillBoxes(id, "O");
      setTurn("X");
    });

    socket.on("reset", () => {
      handleReset();
    });

    socket.on("opponentInfo", ({ opponentName }) => {
      console.log("Received opponentInfo event. Opponent Name:", opponentName);
      setOpponentName(opponentName);
    });

    return () => {
      console.log("Cleaning up socket listeners.");
      socket.off("error");
      socket.off("playerJoined");
      socket.off("xMove");
      socket.off("oMove");
      socket.off("reset");
      socket.off("opponentInfo");
    };
  }, [socket, box]);

  const handleClick = (e) => {
    const id = e.target.id;
    if (box[id] !== 99) return;
    if (turn !== XO) return;

    if (XO === "X") {
      socket.emit("xMove", { id, roomNumber });
    } else if (XO === "O") {
      socket.emit("oMove", { id, roomNumber });
    }
    setTurn(XO === "X" ? "O" : "X");
    fillBoxes(id, XO);
  };

  const fillBoxes = (id, team) => {
    if (box[id] !== 99) return;
    const boxElement = document.getElementById(id);
    let newBox;
    if (team === "X") {
      setBox((prevBox) => {
        const newBox = [...prevBox];
        newBox[id] = 1;
        // Check for winner immediately after state update
        const winner = checkWinner(newBox);
        if (winner) {
          setGameWinner(winner);
        } else if (!newBox.includes(99)) {
          setGameWinner("Draw");
        }
        return newBox;
      });
      boxElement.innerText = "X";
    } else if (team === "O") {
      boxElement.innerText = "O";
      setBox((prevBox) => {
        const newBox = [...prevBox];
        newBox[id] = 2;
        // Check for winner immediately after state update
        const winner = checkWinner(newBox);
        if (winner) {
          setGameWinner(winner);
        } else if (!newBox.includes(99)) {
          setGameWinner("Draw");
        }
        return newBox;
      });
    }
  };

  const checkWinner = (currentBox) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBox[a] !== 99 && currentBox[a] === currentBox[b] && currentBox[a] === currentBox[c]) {
        return currentBox[a] === 1 ? "X" : "O";
      }
    }
    return null;
  };

  const handleReset = () => {
    setBox(Array(props.grid).fill(99));
    setTurn("X"); // Reset turn to X for new game
    setGameWinner(null); // Reset game winner
    const boxElements = document.getElementsByClassName(props.bName);
    for (let element of boxElements) {
      element.innerText = "";
    }
  };

  const resetGame = () => {
    socket.emit("reset", { roomNumber });
  };

  return (
    <div>
      {connected ? (
        <>
          <div>
            <h1>Hello {name}!</h1>
            <h2>Room: {roomNumber}</h2>
          </div>
          {gameWinner ? (
            <GameOver
              setBox={setBox}
              box={box}
              winner={gameWinner === "Draw" ? "Draw" : (gameWinner === XO ? name : opponentName)}
              grid={props.grid}
              resetGame={resetGame}
            />
          ) : (
            <h2>{turn === XO ? "Your turn!" : "Opponent's turn"}</h2>
          )}
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
