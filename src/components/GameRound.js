import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

const GameRound = ({ gameRound }) => {
  const [animate, toggleAnimation] = useState(false);

  useEffect(() => {
    if (gameRound > 0) {
      setTimeout(function() {
        toggleAnimation(true);
      }, 100);
    }
    return () => {
      toggleAnimation(false);
    };
  }, [gameRound]);

  return (
    <div className="round">
      <span>Round</span>
      <CSSTransition in={animate} timeout={400} classNames="blink">
        {typeof gameRound === "string" ? (
          <span className="blink">{gameRound}</span>
        ) : (
          <span>{gameRound || 0}</span>
        )}
      </CSSTransition>
    </div>
  );
};

export default GameRound;
