import React, { useEffect } from "react";

const PlaySound = props => {
  const { color, sound, currentColor, handlePlayerMove } = props;

  useEffect(() => {
    if (color === currentColor) {
      let audio = new Audio(sound);
      audio.play();
    }
  }, [currentColor]);

  return (
    <div
      role="presentation"
      className={`${color}GamePiece`}
      onClick={handlePlayerMove.bind(this, color)}
    />
  );
};

export default PlaySound;
