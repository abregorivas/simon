// Drawing the game board
window.onload = function() {
  drawingObj.drawSection(drawingObj.context1, 'red', 100, 100, 100);
  drawingObj.drawSection(drawingObj.context1, '#333', 100, 100, 25);
  drawingObj.drawSection(drawingObj.context2, 'blue', 0, 100, 100);
  drawingObj.drawSection(drawingObj.context3, 'yellow', 100, 0, 100);
  drawingObj.drawSection(drawingObj.context4, 'green', 0, 0, 100);
  drawingObj.drawSection(drawingObj.context2, '#333', 0, 100, 25);
  drawingObj.drawSection(drawingObj.context3, '#333', 100, 0, 25);
  drawingObj.drawSection(drawingObj.context4, '#333', 0, 0, 25);
};

var drawingObj = {
  canvas1: document.getElementById('canvas1'),
  canvas2: document.getElementById('canvas2'),
  canvas3: document.getElementById('canvas3'),
  canvas4: document.getElementById('canvas4'),
  context1: canvas1.getContext("2d"),
  context2: canvas2.getContext("2d"),
  context3: canvas3.getContext("2d"),
  context4: canvas4.getContext("2d"),
  drawSection: function(section, color, xCord, yCord, radius){
    section.beginPath();
    section.fillStyle = color;
    section.arc(xCord, yCord, radius, 0, 2.5 * Math.PI);
    section.fill();
  }
};

var gameFunctions = {
  startGame: function(){
    gameFunctions.generateCompMoves();
    gameStats.round += 1;
    gameStats.gameStarted = true;
    compPlay = setInterval(increaseIndex, 800);
    $(this).off();
  },
  resetGame: function(){
    clearInterval(compPlay);
    eventTriggers.$disablePressing();
    gameStats.round = 0;
    gameStats.playerTurn = false;
    gameStats.compMoves = [];
    gameStats.playerMoves = [];
    gameStats.compIndex = -1;
    gameStats.playerIndex = -1;
    gameStats.gameStarted = false;
    $("#score").text(0);
    $("#start").on('click', gameFunctions.startGame);
  },
  playCompMoves: function(){
    gameStats.round += 1;
    compPlay = setInterval(increaseIndex, 800);
  },
  replayLastCompMoves: function(){
    compPlay = setInterval(increaseIndex, 800);
  },
  updatePlayerMove: function(indexPlayed){
    gameStats.playerMoves.push(indexPlayed);
    gameStats.playerIndex += 1;
  },
  checkPlayerMove: function(){
    if(gameStats.strictMode){
      gameFunctions.strictModeCheckPlayerMove();
    } else {
      if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]) {
        eventTriggers.$disablePressing();
        gameStats.playerTurn = false;
        gameStats.playerIndex = -1;
        gameStats.playerMoves = [];
        $("#score").text("!!").css("color", "red");
        setTimeout(gameFunctions.replayLastCompMoves, 500);
      }

      if (gameStats.round == gameStats.playerMoves.length) {
        eventTriggers.$disablePressing();
        gameStats.playerTurn = false;
        gameStats.playerIndex = -1;
        gameStats.playerMoves = [];
        gameFunctions.playCompMoves();
      }
    }
  },
  strictModeCheckPlayerMove: function (){
    if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]){
      gameFunctions.resetGame();
    } else if(gameStats.round == gameStats.playerMoves.length) {
      eventTriggers.$disablePressing();
      gameStats.playerTurn = false;
      gameStats.playerIndex = -1;
      gameStats.playerMoves = [];
      gameFunctions.playCompMoves();
    }
  },
  generateCompMoves: function() {
    for (var i = 0; i < 20; i++) {
      gameStats.compMoves.push(Math.floor(Math.random() * 4));
    }
  }
};

var eventTriggers = {
  $startGame: $("#start").on('click', gameFunctions.startGame),
  $reset: $("#reset").on('click', gameFunctions.resetGame),
  $strictMode: $("input").on('click', function(){$(this).is(':checked') ? gameStats.strictMode = true : gameStats.strictMode = false;}),
  $enablePressing: function(){
    $("#canvas1").on('click', pressColor.red);
    $("#canvas2").on('click', pressColor.blue);
    $("#canvas3").on('click', pressColor.yellow);
    $("#canvas4").on('click', pressColor.green);
  },
  $disablePressing: function() {
    $("#canvas1").off();
    $("#canvas2").off();
    $("#canvas3").off();
    $("#canvas4").off();
  }
};

var audioObj = {
  redSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  blueSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  yellowSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
  greenSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

var pressColor = {
  red: function() {
    audioObj.redSound.play();
    drawingObj.drawSection(drawingObj.context1, '#FF4F4F', 100, 100, 100);
    drawingObj.drawSection(drawingObj.context1, '#333', 100, 100, 25);
    setTimeout(function() {
      drawingObj.context1.beginPath();
      drawingObj.context1.fillStyle = "red";
      drawingObj.context1.arc(100, 100, 100, 0, 2.5 * Math.PI);
      drawingObj.context1.fill();
      drawingObj.context1.beginPath();
      drawingObj.context1.fillStyle = '#333';
      drawingObj.context1.arc(100, 100, 25, 0, 2.5 * Math.PI);
      drawingObj.context1.fill();
    }, 500);

    if (gameStats.playerTurn) {
      var moveIndex = $(this).attr('value');
      gameFunctions.updatePlayerMove(moveIndex);
      gameFunctions.checkPlayerMove();
    }
  },
  blue: function(){
    audioObj.blueSound.play();
    drawingObj.drawSection(drawingObj.context2, '#4F4FFF', 0, 100, 100);
    drawingObj.drawSection(drawingObj.context2, '#333', 0, 100, 25);
    setTimeout(function() {
      drawingObj.context2.beginPath();
      drawingObj.context2.fillStyle = "blue";
      drawingObj.context2.arc(0, 100, 100, 0, 2.5 * Math.PI);
      drawingObj.context2.fill();
      drawingObj.context2.beginPath();
      drawingObj.context2.fillStyle = '#333';
      drawingObj.context2.arc(0, 100, 25, 0, 2.5 * Math.PI);
      drawingObj.context2.fill();
    }, 500);

    if (gameStats.playerTurn) {
      var moveIndex = $(this).attr('value');
      gameFunctions.updatePlayerMove(moveIndex);
      gameFunctions.checkPlayerMove();
    }
  },
  yellow: function(){
    audioObj.yellowSound.play();
    drawingObj.drawSection(drawingObj.context3, '#FFFF7F', 100, 0, 100);
    drawingObj.drawSection(drawingObj.context3, '#333', 100, 0, 25);
    setTimeout(function() {
      drawingObj.context3.beginPath();
      drawingObj.context3.fillStyle = "yellow";
      drawingObj.context3.arc(100, 0, 100, 0, 2.5 * Math.PI);
      drawingObj.context3.fill();
      drawingObj.context3.beginPath();
      drawingObj.context3.fillStyle = '#333';
      drawingObj.context3.arc(100, 0, 25, 0, 2.5 * Math.PI);
      drawingObj.context3.fill();
    }, 500);

    if (gameStats.playerTurn) {
      var moveIndex = $(this).attr('value');
      gameFunctions.updatePlayerMove(moveIndex);
      gameFunctions.checkPlayerMove();
    }
  },
  green: function(){
    audioObj.greenSound.play();
    drawingObj.drawSection(drawingObj.context4, '#408040', 0, 0, 100);
    drawingObj.drawSection(drawingObj.context4, '#333', 0, 0, 25);
    setTimeout(function() {
      drawingObj.context4.beginPath();
      drawingObj.context4.fillStyle = "green";
      drawingObj.context4.arc(0, 0, 100, 0, 2.5 * Math.PI);
      drawingObj.context4.fill();
      drawingObj.context4.beginPath();
      drawingObj.context4.fillStyle = '#333';
      drawingObj.context4.arc(0, 0, 25, 0, 2.5 * Math.PI);
      drawingObj.context4.fill();
    }, 300);

    if (gameStats.playerTurn) {
      var moveIndex = $(this).attr('value');
      gameFunctions.updatePlayerMove(moveIndex);
      gameFunctions.checkPlayerMove();
    }
  }
};

var gameStats = {
  strictMode: false,
  round: 0,
  playerTurn: false,
  compMoves: [],
  playerMoves: [],
  compIndex: -1,
  playerIndex: -1
};



//runs through the appropriate number of indices to be played on each turn of the computer
function increaseIndex() {
  ++gameStats.compIndex;
  $("#score").text(gameStats.round).css("color", "white");
  if (gameStats.compIndex >= gameStats.round) {
    gameStats.compIndex = -1;
    clearInterval(compPlay);
    eventTriggers.$enablePressing();
    gameStats.playerTurn = true;
  }
  switch (gameStats.compMoves[gameStats.compIndex]) {
    case 0:
      pressColor.red();
      break;
    case 1:
      pressColor.blue();
      break;
    case 2:
      pressColor.yellow();
      break;
    case 3:
      pressColor.green();
      break;
                                                  }
}
