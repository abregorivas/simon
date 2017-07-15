import $ from 'jquery';

const $onOffSwitch = $('#myonoffswitch');
const $playBtn = $('.playBtn');
const $resetBtn = $('.resetBtn');
const $gamePieces = $('.gameContainer').children();
const $round = $('.round');

// audio files are indexed the same as glow colors green ,red, yellow and blue
const audioObj = [
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  new Audio('./sounds/gameover.mp3'),
];

const gameStats = {
  glowClasses: ['glowGreen', 'glowRed', 'glowYellow', 'glowBlue'],
  compMoves: [],
  playerMoves: [],
  round: 1,
  strictMode: true,
  bestScore: 0,
  difficulty: 1,
  compTurn: true,
  gameOn: false,
};

const generateRandNum = function generateRandNum(min, max) {
  const limit = (max - min) + 1;
  return Math.floor(Math.random() * (limit + min));
};

const generateCompMoves = function generateCompMoves(len) {
  const results = [];
  let i = 0;
  for (; i < len; i += 1) {
    results.push(generateRandNum(0, 3));
  }
  return results;
};

const resetGame = function resetGame() {
  gameStats.playerMoves = [];
  gameStats.round = 1;
  gameStats.compMoves = [];
  gameStats.gameOn = false;
  $round.html('<span>Round</span> 0');
  gameStats.compTurn = true;
};

const playSound = function playSound(Index) {
  audioObj[Index].play();
};

const pressColor = function pressColor(colorIndex, soundTime, glowTime) {
  $gamePieces.eq(colorIndex).addClass(gameStats.glowClasses[colorIndex]);
  setTimeout(playSound.bind(null, colorIndex), soundTime);

  setTimeout(() => {
    $gamePieces.eq(colorIndex).removeClass(gameStats.glowClasses[colorIndex]);
  }, glowTime);
};

const playCompMoves = function playCompMoves(compMoves, gameRound) {
  const glowSpeed = 500;
  const moveSpeed = 600;
  const glowSpeedPct = 1 - (gameRound / 100);
  const glowTime = glowSpeed * glowSpeedPct;
  const cpuMoves = compMoves.slice(0, gameRound);
  cpuMoves.forEach((el, index) => {
    setTimeout(() => {
      pressColor(el, 50, glowTime);
      sound.pause();
      sound.currentTime = 0;
    }, (moveSpeed * glowSpeedPct) * (index + 1));
  });
  gameStats.compTurn = false;
};

const playCompMovesReverse = function playCompMovesReverse(compMoves, gameRound) {
  const cpuMovesReverse = compMoves.slice(0, gameRound);
  cpuMovesReverse.forEach((el, index) => {
    setTimeout(() => {
      pressColor(el, 10, 100);
    }, 200 * (index + 1));
  });
  gameStats.compTurn = true;
};

// run this when app launches to have all four pieces highlighted
const initializeGame = function initGame() {
  const moves = [0, 1, 2, 3];
  setTimeout(() => {
    playCompMoves(moves, 4, gameStats.glowClasses);
  }, 1000);

  setTimeout(() => {
    playCompMovesReverse(moves, 4, gameStats.glowClasses);
  }, 4000);
};

const startGame = function startGame() {
  gameStats.gameOn = true;
  gameStats.compMoves = generateCompMoves(20);
  playCompMoves(gameStats.compMoves, gameStats.round);
  gameStats.compTurn = false;
  $round.html(`<span>Round</span> ${gameStats.round}`);
};

const recordPlayerMove = function recordPlayerMove(index) {
  gameStats.playerMoves.push(index);
};

const checkPlayerMove = function checkPlayerMove(gameRound) {
  const compMoves = gameStats.compMoves.slice(0, gameRound);
  const playerMoves = gameStats.playerMoves.slice(0, gameRound);
  let noMatchCount = 0;
  playerMoves.forEach((el, index) => {
    if (el !== compMoves[index]) {
      noMatchCount += 1;
    }
  });
  return !(noMatchCount > 0);
};

const checkRoundComplete = function checkRoundComplete() {
  return gameStats.round === gameStats.playerMoves.length;
};

const gameOver = function gameOver() {
  gameStats.compTurn = true;
  audioObj[4].play();
  const gameInterval = setInterval(() => {
    $round.html('<span>Round</span> Game');
  }, 500);

  const overInterval = setInterval(() => {
    $round.html('<span>Round</span> Over');
  }, 1000);

  setTimeout(() => {
    clearInterval(gameInterval);
    clearInterval(overInterval);
    $round.html(`<span>Round</span> ${gameStats.round}`);
    resetGame();
  }, 3000);
};

const tryAgain = function tryAgain() {
  gameStats.compTurn = false;
  const tryInterval = setInterval(() => {
    $round.html('<span>Round</span> Try');
  }, 500);

  const againInterval = setInterval(() => {
    $round.html('<span>Round</span> Again');
  }, 1000);

  setTimeout(() => {
    clearInterval(tryInterval);
    clearInterval(againInterval);
    $round.html(`<span>Round</span> ${gameStats.round}`);
    gameStats.playerMoves = [];
  }, 2000);
};

$('.gameContainer').on('click', 'div', function gameContainer(event) {
  if (!gameStats.compTurn) {
    event.stopPropagation();
    const colorIndex = $(this).data('colorindex');
    pressColor(colorIndex, 50, 400);
    recordPlayerMove(colorIndex);

    if (!checkPlayerMove(gameStats.round) && gameStats.strictMode) {
      gameOver();
    } else if (!checkPlayerMove(gameStats.round) && !gameStats.strictMode) {
      tryAgain();
    } else if (checkRoundComplete()) {
      gameStats.round += 1;
      gameStats.playerMoves = [];
      $round.text(gameStats.round);
      gameStats.compTurn = true;
      setTimeout(() => {
        playCompMoves(gameStats.compMoves, gameStats.round);
      }, 1000);
    }
  }
});

$playBtn.on('click', () => {
  if (!gameStats.gameOn) {
    startGame();
  }
});

$resetBtn.on('click', resetGame);

$onOffSwitch.on('click', (event) => {
  if (gameStats.gameOn) {
    event.preventDefault();
  } else {
    gameStats.strictMode = event.target.checked;
  }
});

initializeGame();
