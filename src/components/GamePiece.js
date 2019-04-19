import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import PlaySound from "./PlaySound";

const GamePiece = ({ sound, color, currentColor, handlePlayerMove }) => {
  const [glow, toggleGlow] = useState(false);

  useEffect(() => {
    if (currentColor === color) {
      setTimeout(function() {
        toggleGlow(true);
      }, 100);
    }
    return () => {
      toggleGlow(false);
    };
  }, [currentColor]);

  return (
    <CSSTransition in={glow} timeout={400} classNames={`glow-${color}`}>
      <PlaySound
        color={color}
        sound={sound}
        currentColor={currentColor}
        handlePlayerMove={handlePlayerMove}
      />
    </CSSTransition>
  );
};

GamePiece.propTypes = {
  sound: PropTypes.string,
  color: PropTypes.string,
  currentColor: PropTypes.string,
  handlePlayerMove: PropTypes.func
};

export default GamePiece;
