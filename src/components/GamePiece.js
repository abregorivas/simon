import React from "react";
import classnames from "classnames";

const GamePiece = ({
  classes,
  color,
  currentColor,
  handlePlayerMove,
  index
}) => {
  let cx = classnames(classes, color == currentColor ? `glow-${color}` : null);
  return (
    <div
      role="presentation"
      className={cx}
      onClick={e => {
        e.preventDefault;
        handlePlayerMove(index, true);
      }}
    />
  );
};

export default GamePiece;
