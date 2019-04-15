import React, { Component } from "react";
import ReactDOM from "react-dom";
import GamePiece from "./components/GamePiece";
import "normalize.css";
import "./styles/main.scss";
import greenSound from "./sounds/simonSound1.mp3";
import redSound from "./sounds/simonSound2.mp3";
import yellowSound from "./sounds/simonSound3.mp3";
import blueSound from "./sounds/simonSound4.mp3";
import gameOver from "./sounds/gameover.mp3";
import uuidv1 from "uuid";

class App extends Component {
  state = {
    loading: true,
    colors: ["green", "red", "yellow", "blue"],
    gameSounds: [greenSound, redSound, yellowSound, blueSound, gameOver],
    gameRound: 0,
    gameOn: false,
    playerTurn: false,
    compMoves: [0, 1, 2, 3],
    playerMoves: [],
    currentColor: null,
    message: false,
    playerMoved: false
  };

  componentDidMount() {
    const start = function(cb1, cb2) {
      setTimeout(cb1, 1700);
      setTimeout(cb2, 5000);
    };

    start(this.loadingAnimation, this.initializeGame);
  }

  componentWillUnmount() {
    this.resetGame();
  }

  componentDidUpdate(prevProps, prevState) {
    let handleCompAction = cb => {
      setTimeout(this.playCompMoves, 1000);
      setTimeout(cb, this.state.gameRound * 1000);
    };

    let switchPlayer = () => {
      this.setState({ playerTurn: true });
    };

    let endPlayersTurn = () => {
      this.setState({
        playerTurn: false,
        currentColor: "",
        gameRound: this.state.gameRound + 1,
        playerMoves: [],
        playerMoved: false
      });
    };

    if (prevState.gameRound < this.state.gameRound && !this.state.playerTurn) {
      handleCompAction(switchPlayer);
    }

    if (this.state.playerTurn && this.state.playerMoved) {
      this.playSound(this.state.colors.indexOf(this.state.currentColor));
      this.setState({ playerMoved: false });
      if (this.state.playerMoves.length == this.state.gameRound) {
        setTimeout(endPlayersTurn, 400);
      }
    }
  }

  loadingAnimation = () => {
    this.playCompMoves([0, 1, 2, 3]);
  };

  initializeGame = () => {
    this.setState({
      compMoves: this.generateCompMoves(50),
      loading: false
    });
  };

  playCompMoves = moves => {
    let { compMoves, gameRound } = this.state;
    let playablemoves = moves ? moves : compMoves.slice(0, gameRound);
    let glow = this.pressColor;
    let playSound = this.playSound;
    let resetColor = () => {
      this.setState({ currentColor: "" });
    };

    for (var i = 0; i < playablemoves.length; i++) {
      setTimeout(
        (function(i) {
          return function() {
            playSound(playablemoves[i]);
            glow(playablemoves[i]);
            if (i + 1 === playablemoves.length) {
              setTimeout(resetColor, 500);
            }
          };
        })(i),
        i * 1000
      );
    }
  };

  startGame = () => {
    let { loading } = this.state;

    if (!loading) {
      this.setState({
        gameOn: true,
        gameRound: 1,
        message: false,
        playerMoves: []
      });
    }
  };

  generateRandNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  generateCompMoves = len => {
    let results = [];
    for (let i = 0; i < len; i++) {
      results.push(this.generateRandNum(0, 3));
    }
    return results;
  };

  resetGame = () => {
    let { loading, gameOn } = this.state;
    if (!loading && gameOn) {
      this.setState({
        playerMoves: [],
        gameRound: 0,
        compMoves: this.generateCompMoves(50),
        gameOn: false,
        playerTurn: false,
        currentColor: null,
        message: false
      });
    }
  };

  pressColor = (index, playerClicked) => {
    let { colors } = this.state;
    if (playerClicked) {
      this.setState({
        currentColor: colors[index],
        playerMoved: true
      });
    } else {
      this.setState({ currentColor: colors[index] });
    }
  };

  playSound = index => {
    let { gameSounds } = this.state;
    let audio = new Audio(gameSounds[index]);
    audio.play();
  };

  playerMove = (index, playerClicked) => {
    let { playerTurn } = this.state;

    if (playerTurn) {
      this.pressColor(index, playerClicked);
      if (this.checkPlayerMove(index)) {
        this.recordPlayerMove(index);
      } else {
        this.gameOver();
      }
    }
  };

  checkPlayerMove = index => {
    let { compMoves, playerMoves, gameRound } = this.state;
    let comp = compMoves.slice(0, gameRound + 1);
    let player = playerMoves.slice(0, gameRound + 1).concat([index]);

    var noMatchCount = 0;
    player.forEach((el, index) => {
      if (el !== comp[index]) {
        noMatchCount += 1;
      }
    });
    return noMatchCount > 0 ? false : true;
  };

  recordPlayerMove = index => {
    let { playerMoves } = this.state;
    this.setState({ playerMoves: playerMoves.concat([index]) });
  };

  gameOver = () => {
    this.setState({
      playerTurn: false,
      gameRound: 0,
      gameOn: false,
      message: "Game Over",
      playerMoved: false,
      currentColor: "",
      compMoves: this.generateCompMoves(50)
    });
    this.playSound(4);
  };

  render() {
    let { gameRound, colors, currentColor, message } = this.state;
    return (
      <div>
        <div className="gameContainer">
          {colors.map((color, index) => (
            <GamePiece
              key={uuidv1()}
              classes={`${color}GamePiece`}
              color={color}
              currentColor={currentColor}
              index={index}
              handlePlayerMove={this.playerMove}
            />
          ))}

          <div className="cover">
            <h2>simon</h2>
            <div className="topSection">
              <button className="playBtn" onClick={this.startGame} />
              <button className="resetBtn" onClick={this.resetGame} />
              <div className="onoffswitch">
                <input
                  type="checkbox"
                  name="onoffswitch"
                  className="onoffswitch-checkbox"
                  id="myonoffswitch"
                  checked
                  readOnly
                />
                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                  <span className="onoffswitch-inner" />
                  <span className="onoffswitch-switch" />
                </label>
              </div>
            </div>
            <div className="bottomSection">
              <p>Start</p>
              <p>Reset</p>
              <p>Strict</p>
            </div>
            <div className="round">
              <span>Round</span>
              {message ? <span>{message}</span> : <span>{gameRound}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
