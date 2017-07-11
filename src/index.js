var $onOffSwitch = $("#myonoffswitch");
var $playBtn = $(".playBtn");
var $resetBtn = $(".resetBtn");
var $gamePieces = $(".gameContainer").children();
var $round = $(".round");
//audio files are indexed the same as glow colors green ,red, yellow and blue
var audioObj = [
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  new Audio('./sounds/gameover.mp3')
]

var gameStats = {
  glowClasses: ['glowGreen', 'glowRed', 'glowYellow', 'glowBlue'],
  compMoves: [],
  playerMoves: [],
  round: 1,
  strictMode: true,
  bestScore: 0,
  difficulty: 1,
  compTurn: true,
  gameOn: false
}

var generateRandNum = function generateRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var generateCompMoves = function generateCompMoves(len) {
  let results = [];
  let i = 0;
  for (; i < len; i++) {
    results.push(generateRandNum(0, 3));
  }
  return results;
}

var resetGame = function resetGame() {
  gameStats.playerMoves = [];
  gameStats.round = 1;
  gameStats.compMoves = [];
  gameStats.gameOn = false;
  $round.text("0");
  gameStats.compTurn = true;
  console.log(gameStats);
}

var playSound = function (Index) {
  audioObj[Index].play();
}

var pressColor = function pressColor(colorIndex, soundTime, glowTime) {
  $gamePieces.eq(colorIndex).addClass(gameStats.glowClasses[colorIndex]);
  setTimeout(playSound.bind(null, colorIndex), soundTime);

  setTimeout(function () {
    $gamePieces.eq(colorIndex).removeClass(gameStats.glowClasses[colorIndex]);
  }, glowTime);
}


var playCompMoves = function playCompMoves(compMoves, gameRound, ) {
  var glowSpeed = 500;
  var moveSpeed = 600;
  var compMoves = compMoves.slice(0, gameRound);
  compMoves.forEach(function (el, index) {
    setTimeout(function () {
      pressColor(el, 50, glowSpeed*(1-(gameRound+1)/100));
    }, (moveSpeed *(1-(gameRound+1)/100))* (index + 1));
  })
  gameStats.compTurn = false;
}



var playCompMovesReverse = function playCompMoves(compMoves, gameRound) {
  var compMoves = compMoves.slice(0, gameRound);
  compMoves.forEach(function (el, index) {
    setTimeout(function () {
      pressColor(el, 10, 100);
    }, 200 * (index + 1));
  })
  gameStats.compTurn = true;
}

//run this when app launches to have all four pieces highlighted
var initializeGame = function initGame() {

  setTimeout(function () {
    var moves = [0, 1, 2, 3];
    playCompMoves(moves, 4, gameStats.glowClasses)
  }, 1000)

  setTimeout(function () {
    var moves = [0, 1, 2, 3 ];
    playCompMovesReverse(moves, 4, gameStats.glowClasses)
  }, 4000)

  console.log(gameStats)
  //add a glowing backwards
}

var startGame = function startGame() {
  gameStats.gameOn = true;
  gameStats.compMoves = generateCompMoves(20);
  playCompMoves(gameStats.compMoves, gameStats.round);
  gameStats.compTurn = false;
  $round.text(gameStats.round);
}

var recordPlayerMove = function (index) {
  gameStats.playerMoves.push(index);
}

var checkPlayerMove = function checkPlayerMove(gameRound) {
  var compMoves = gameStats.compMoves.slice(0, gameRound);
  var playerMoves = gameStats.playerMoves.slice(0, gameRound);
  var noMatchCount = 0;
  playerMoves.forEach(function (el, index) {
    if (el !== compMoves[index]) {
      noMatchCount += 1;
    }
  })
  return noMatchCount > 0 ? false : true;
}

var checkRoundComplete = function checkRoundComplete() {
  return gameStats.round === gameStats.playerMoves.length;
}

var gameOver = function gameOver() {
  gameStats.compTurn = true;
  audioObj[4].play();
  var gameInterval = setInterval(function () {
    $round.text("Game");
  }, 500);

  var overInterval = setInterval(function () {
    $round.text('Over');
  }, 1000);

  setTimeout(function () {
    clearInterval(gameInterval);
    clearInterval(overInterval);
    $round.text('0');
    resetGame();
  }, 3000)

}

var tryAgain = function tryAgain() {
  gameStats.compTurn = false;
  var tryInterval = setInterval(function () {
    $round.text("Try");
  }, 500);

  var againInterval = setInterval(function () {
    $round.text('Again');
  }, 1000);

  setTimeout(function () {
    clearInterval(tryInterval);
    clearInterval(againInterval);
    $round.text(String(gameStats.round));
    gameStats.playerMoves = [];
  }, 2000)
}

$(".gameContainer").on('click', 'div', function (event) {
  console.log(gameStats);
  if (!gameStats.compTurn) {
    event.stopPropagation();
    var colorIndex = $(this).data('colorindex')
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
      setTimeout(function () {
        playCompMoves(gameStats.compMoves, gameStats.round);
      }, 1000)

      console.log(gameStats);
    }
  }
});

$playBtn.on('click', function () {
  if (!gameStats.gameOn) {
    startGame();
  }
});

$resetBtn.on('click', resetGame);

$onOffSwitch.on('click', function (event) {
  if (gameStats.gameOn) {
    event.preventDefault();
  } else {
    gameStats.strictMode = event.target.checked;
  }
});

initializeGame();
