import React from "react";
import PropTypes from "prop-types";
import GameRound from "./GameRound";
import StrictModeToggle from "./StrictModeToggle";

const GameControls = ({
  handleGameStart,
  handleGameReset,
  handleStrictModeToggle,
  gameRound,
  strict
}) => {
  return (
    <div className="cover">
      <h2>SIMON</h2>
      <div className="topSection">
        <button className="playBtn" onClick={() => handleGameStart()} />
        <button className="resetBtn" onClick={() => handleGameReset(null, 0)} />
        <StrictModeToggle
          strict={strict}
          handleToggle={handleStrictModeToggle}
        />
      </div>
      <div className="bottomSection">
        <p>Start</p>
        <p>Reset</p>
        <p>Strict</p>
      </div>
      <GameRound gameRound={gameRound} />
    </div>
  );
};

GameControls.propTypes = {
  gameRound: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strict: PropTypes.bool,
  handleGameStart: PropTypes.func,
  handleGameReset: PropTypes.func,
  handleStrictModeToggle: PropTypes.func
};

export default GameControls;
