import React, { useEffect, useState } from "react";
import GameOver from "./GameOver";

export default function Grid(props) {
  const [canPlay, setCanPlay] = useState(true);
  const [count, setCount] = useState(0);
  const [turn, setTurn] = useState(0);
  const [grid, setGrid] = useState(new Array(props.count || 9).fill(99));
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (count === props.grid) {
      setCanPlay(false);
      setWinner("No one");
      if (canPlay) resetGame();
      return;
    }
    if (
      grid[0] + grid[1] + grid[2] === 3 ||
      grid[3] + grid[4] + grid[5] === 3 ||
      grid[6] + grid[7] + grid[8] === 3 ||
      grid[0] + grid[3] + grid[6] === 3 ||
      grid[1] + grid[4] + grid[7] === 3 ||
      grid[2] + grid[5] + grid[8] === 3 ||
      grid[0] + grid[4] + grid[8] === 3 ||
      grid[2] + grid[4] + grid[6] === 3 ||
      grid[0] + grid[1] + grid[2] === 6 ||
      grid[3] + grid[4] + grid[5] === 6 ||
      grid[6] + grid[7] + grid[8] === 6 ||
      grid[0] + grid[3] + grid[6] === 6 ||
      grid[1] + grid[4] + grid[7] === 6 ||
      grid[2] + grid[5] + grid[8] === 6 ||
      grid[0] + grid[4] + grid[8] === 6 ||
      grid[2] + grid[4] + grid[6] === 6
    ) {
      setCanPlay(false);
      setWinner(turn ? "O" : "X");
      if (canPlay) resetGame();
      return;
    }
  });

  const resetGame = () => {
    setGrid(new Array(props.count || 9).fill(99));
    document.querySelectorAll(`.${props.bName}`).forEach((box) => {
      box.innerHTML = "";
    });
    setCount(0);
  };

  const handleClick = (e) => {
    if (!canPlay) {
      return; // Game is over
    }
    setCount(count + 1);
    const box = e.target;
    const boxIndex = box.id;
    if (grid[boxIndex] !== 99) {
      return; // Box already filled
    }
    if (turn) {
      box.innerHTML = "X";
      grid[boxIndex] = 1;
      setTurn(0);
    } else {
      box.innerHTML = "O";
      grid[boxIndex] = 2;
      setTurn(1);
    }
  };
  return (
    <div>
      <div className={props.gName}>
        {grid.map((_, i) => {
          return (
            <div
              className={props.bName}
              id={i}
              key={i}
              onClick={handleClick}
            ></div>
          );
        })}
      </div>
      {canPlay ? (
        ""
      ) : (
        <GameOver canPlay={setCanPlay} winner={winner}></GameOver>
      )}
    </div>
  );
}
