import React from "react";

export default function GameOver(props) {
  const winner = props.winner;
  const handleClick = () => {
    props.canPlay(true);
  };
  return (
    <div className="resultBox">
      <h1>{winner} is the Winner</h1>
      <button className="reset" onClick={handleClick}>
        Play Again?
      </button>
    </div>
  );
}
