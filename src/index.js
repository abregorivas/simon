import React, { Component } from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./styles/main.scss";
import greenSound from "./sounds/simonSound1.mp3";
import redSound from "./sounds/simonSound2.mp3";
import yellowSound from "./sounds/simonSound3.mp3";
import blueSound from "./sounds/simonSound4.mp3";
import gameOverSound from "./sounds/gameover.mp3";
import GameControls from "./components/GameControls";
import { CSSTransition } from "react-transition-group";
import { generateCompMoves, timeout } from "./utilities/index";
import GamePiece from "./components/GamePiece";
let gameSounds = [greenSound, redSound, yellowSound, blueSound];

class App extends Component {
  state = {
    loading: true,
    colors: ["green", "red", "yellow", "blue"],
    gameRound: null,
    gameOn: null,
    playerTurn: null,
    compMoves: [],
    playerMoves: [],
    currentColor: null,
    strict: true
  };

  componentDidMount() {
    this.initializeGame();
  }

  componentDidUpdate(prevProps, prevState) {
    let handleTrygain = () => {
      this.setState({ gameRound: prevState.gameRound });
    };

    if (this.state.gameRound === "Try Again") {
      setTimeout(handleTrygain, 2000);
    }
  }

  componentWillUnmount() {
    this.resetGame();
  }

  initializeGame = () => {
    let setInitialGameState = () => {
      this.setState({
        compMoves: generateCompMoves(50),
        gameOn: false,
        playerTurn: true,
        gameRound: 0
      });
    };

    this.setState(
      () => ({ loading: false }),
      () => {
        setTimeout(
          this.playCompMoves.bind(this, [0, 1, 2, 3], setInitialGameState),
          1400
        );
      }
    );
  };

  startGame = () => {
    let { gameRound } = this.state;

    if (gameRound === 0 || gameRound === "Game Over") {
      this.setState(
        () => ({
          gameOn: true,
          gameRound: 1
        }),
        () => this.playCompMoves(null, this.endCompTurn)
      );
    }
  };

  playCompMoves = (moves, cb) => {
    let { compMoves, gameRound, colors } = this.state;
    let playablemoves = moves ? moves : compMoves.slice(0, gameRound);

    let setColor = index => {
      this.setState({ currentColor: colors[index] });
    };

    let resetColor = () => {
      this.setState({ currentColor: "" });
    };

    for (var i = 0; i < playablemoves.length; i++) {
      setTimeout(
        (function(i) {
          return function() {
            setColor(playablemoves[i]);
            resetColor();
            if (i == playablemoves.length - 1) {
              setTimeout(cb, 500);
            }
          };
        })(i),
        i * 1000
      );
    }
  };

  endCompTurn = () => {
    this.setState({ playerTurn: true });
  };

  playerMove = userColor => {
    let { colors, playerMoves, gameRound, playerTurn } = this.state;
    let index = colors.indexOf(userColor);
    let setColor = userColor => {
      this.setState({ currentColor: userColor });
    };

    let recordPlayerMove = () => {
      this.setState({
        playerMoves: playerMoves.concat([index]),
        currentColor: ""
      });
    };

    let endPlayersTurn = () => {
      this.setState(
        prevState => ({
          playerTurn: false,
          currentColor: "",
          gameRound: prevState.gameRound + 1,
          playerMoves: []
        }),
        () => this.playCompMoves(null, this.endCompTurn)
      );
    };

    let makeMove = (nextTurn, endTurn) => {
      if (playerMoves.length + 1 === gameRound) {
        timeout(endTurn, 1000);
      } else {
        timeout(nextTurn, 50);
      }
    };

    if (playerTurn && gameRound > 0) {
      setColor(userColor);
      if (this.checkPlayerMove(userColor)) {
        makeMove(recordPlayerMove, endPlayersTurn);
      } else {
        if (this.state.strict) {
          this.gameOver();
        } else {
          this.tryAgain();
        }
      }
    }
  };

  checkPlayerMove = color => {
    let { colors, compMoves, playerMoves, gameRound } = this.state;
    let index = colors.indexOf(color);
    let player = playerMoves.slice(0, gameRound + 1).concat([index]);
    let comp = compMoves.slice(0, player.length);
    // only good if array does not have any opjects
    return JSON.stringify(player) === JSON.stringify(comp) ? true : false;
  };

  resetGame = (cb, resetTrigger) => {
    if (this.state.playerTurn) {
      this.setState(
        () => ({
          playerMoves: [],
          gameRound: resetTrigger,
          compMoves: generateCompMoves(50),
          gameOn: false,
          playerTurn: true,
          currentColor: ""
        }),
        () => {
          if (cb) cb();
        }
      );
    }
  };

  gameOver = () => {
    let playSound = () => {
      let audio = new Audio(gameOverSound);
      audio.play();
    };

    this.resetGame(playSound, "Game Over");
  };

  tryAgain = () => {
    let audio = new Audio(gameOverSound);
    audio.play();
    this.setState({ gameRound: "Try Again", playerMoves: [] });
  };

  toggleStrictMode = () => {
    this.setState(prevState => ({ strict: !prevState.strict }));
  };

  render() {
    let { colors, gameRound, currentColor, strict } = this.state;
    return (
      <CSSTransition in={this.state.loading} timeout={1500} classNames="rotate">
        <div className="gameContainer">
          {colors.map((color, index) => (
            <GamePiece
              key={color}
              sound={gameSounds[index]}
              color={color}
              handlePlayerMove={this.playerMove}
              currentColor={currentColor}
            />
          ))}

          <GameControls
            handleGameStart={this.startGame}
            handleGameReset={this.resetGame}
            handleStrictModeToggle={this.toggleStrictMode}
            gameRound={gameRound}
            strict={strict}
          />
        </div>
      </CSSTransition>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
