import React, { useEffect } from "react";

export default function GameOver(props) {
  const winner = props.winner;
  const handleClick = () => {
    props.resetGame();
  };
  return (
    <div className="resultBox">
      <h1>{winner === "Draw" ? "It's a draw!" : `${winner} is the Winner`}</h1>
      <button className="reset" onClick={handleClick}>
        Play Again?
      </button>
    </div>
  );
}
