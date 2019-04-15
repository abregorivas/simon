import React from "react";
import PropTypes from "prop-types";
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

GamePiece.propTypes = {
  classes: PropTypes.string,
  color: PropTypes.string,
  currentColor: PropTypes.string,
  handlePlayerMove: PropTypes.func,
  index: PropTypes.number
};

export default GamePiece;
