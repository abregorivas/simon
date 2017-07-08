

//DOM Events
var $onOffSwitch = $("#myonoffswitch");

  var generateRandNum = function generateRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var generateCompMoves = function generateCompMoves(len){
    var results =[];
    var i = 0;
    for(;i< len; i++){
      results.push(generateRandNum(1,4));
    }
    return results;
  }

//capture users selection
//check users sequence

//check if user is on strict mode
var strictModeStatus;
var gameStarted = false;

$onOffSwitch.on('click', function(event){
  if(gameStarted){
    event.preventDefault();
  } else {
  strictModeStatus = event.target.checked;
  }
  // if(!status){
  //   // event.preventDefault();
  //   event.stopPropagation();
  // }
  // console.log($("#myonoffswitch").is(':checked'));
})

var highlight = function highlight(event){
  $(this).addClass('glowGreen');
  console.log(event);
  setTimeout(function(){
    $(event.target).removeClass('glowGreen');
  }, 2500);
}

$(".greenGamePiece").on('click', highlight);



$("button").on("click",function(){
  gameStarted ? gameStarted = false: gameStarted = true;
  console.log("gameStared: ", gameStarted);
})
console.log(generateCompMoves(20));




// function getClickPosition(e) {
//     var xPosition = e.clientX;
//     var yPosition = e.clientY;
//     console.log("x: ", xPosition, "y: ", yPosition);
// }


// window.addEventListener('click', getClickPosition);
// (function IIFE($, window, document) {
//   // Locally scope $
//   $(function () {
//     //DOM Ready!!!!
//   });

// "use strict"

// var gameSize = 0;
// var greyRadius = gameSize/4;

// var init = function init(){
//   if(window.innerWidth > 1024) {
//     gameSize = windowSizingObj.large;
//   } else if(window.innerWidth > 768) {
//     gameSize = windowSizingObj.medium;
//   } else if(window.innerWidth > 450) {
//     gameSize = windowSizingObj.small;
//   } else {
//     gameSize = windowSizingObj.xSmall;
//   }


//   console.log(gameSize);

//    $("#canvas1").attr({"width": gameSize, "height": gameSize});
//    $("#canvas2").attr({"width": gameSize, "height": gameSize});
//    $("#canvas3").attr({"width": gameSize, "height": gameSize});
//    $("#canvas4").attr({"width": gameSize, "height": gameSize});


//   console.log(greyRadius);
//   drawingObj.drawSection(drawingObj.context1, 'red', gameSize, gameSize, gameSize);
//   drawingObj.drawSection(drawingObj.context2, 'blue', 0, gameSize, gameSize);
//   drawingObj.drawSection(drawingObj.context3, 'yellow', gameSize, 0, gameSize);
//   drawingObj.drawSection(drawingObj.context4, 'green', 0, 0, gameSize);
//   drawingObj.drawSection(drawingObj.context1, '#333', gameSize, gameSize, greyRadius);
//   drawingObj.drawSection(drawingObj.context2, '#333', 0, gameSize, greyRadius);
//   drawingObj.drawSection(drawingObj.context3, '#333', gameSize, 0, greyRadius);
//   drawingObj.drawSection(drawingObj.context4, '#333', 0, 0, greyRadius);
// }

// var windowSizingObj = {
//   large: 500,
//   medium: 400,
//   small: 250,
//   xSmall: 100
// };
// var w = window.innerWidth;
// console.log("WindowWidth" + w );

// var drawingObj = {
//   canvas1: document.getElementById('canvas1'),
//   canvas2: document.getElementById('canvas2'),
//   canvas3: document.getElementById('canvas3'),
//   canvas4: document.getElementById('canvas4'),
//   context1: canvas1.getContext("2d"),
//   context2: canvas2.getContext("2d"),
//   context3: canvas3.getContext("2d"),
//   context4: canvas4.getContext("2d"),
//   drawSection: function(section, color, xCord, yCord, radius) {
//     section.beginPath();
//     section.fillStyle = color;
//     section.arc(xCord, yCord, radius, 0, 2.5 * Math.PI);
//     section.fill();
//   }
// };

// var gameFunctions = {
//   startGame: function() {
//     gameFunctions.generateCompMoves();
//     gameStats.round += 1;
//     gameStats.gameStarted = true;
//    var  compPlay = setInterval(increaseIndex, 800);
//     $(this).off();
//   },

//   resetGame: function() {
//     clearInterval(compPlay);
//     gameStats.winner ? clearInterval(win1) : 0;
//     gameStats.winner ? clearInterval(win2) : 0;
//     eventTriggers.$disablePressing();
//     gameStats.round = 0;
//     gameStats.playerTurn = false;
//     gameStats.compMoves = [];
//     gameStats.playerMoves = [];
//     gameStats.compIndex = -1;
//     gameStats.playerIndex = -1;
//     gameStats.gameStarted = false;
//     $("#score").text(0).css("color", "white");
//     $("#start").on('click', gameFunctions.startGame);
//   },
//   alertWin1: function() {
//     $("#score").text("WIN").css("color", "green");
//   },
//   alertWin2: function() {
//     $("#score").text("WIN").css("color", "white");
//   },
//   playCompMoves: function() {
//     if (gameStats.round == 2) {
//       gameStats.winner = true;
//       win1 = setInterval(gameFunctions.alertWin1, 500);
//       win2 = setInterval(gameFunctions.alertWin2, 1000);
//     } else {
//       gameStats.round += 1;
//       compPlay = setInterval(increaseIndex, 800);
//     }
//   },
//   replayLastCompMoves: function() {
//     compPlay = setInterval(increaseIndex, 800);
//   },
//   updatePlayerMove: function(indexPlayed) {
//     gameStats.playerMoves.push(indexPlayed);
//     gameStats.playerIndex += 1;
//   },
//   checkPlayerMove: function() {
//     if (gameStats.strictMode) {
//       gameFunctions.strictModeCheckPlayerMove();
//     } else {
//       if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]) {
//         eventTriggers.$disablePressing();
//         gameStats.playerTurn = false;
//         gameStats.playerIndex = -1;
//         gameStats.playerMoves = [];
//         $("#score").text("!!").css("color", "red");
//         setTimeout(gameFunctions.replayLastCompMoves, 500);
//       }

//       if (gameStats.round == gameStats.playerMoves.length) {
//         eventTriggers.$disablePressing();
//         gameStats.playerTurn = false;
//         gameStats.playerIndex = -1;
//         gameStats.playerMoves = [];
//         gameFunctions.playCompMoves();
//       }
//     }
//   },
//   strictModeCheckPlayerMove: function() {
//     if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]) {
//       $("#score").text("Lose").css("color", "red");
//       setTimeout(gameFunctions.resetGame, 1000);
//     } else if (gameStats.round == gameStats.playerMoves.length) {
//       eventTriggers.$disablePressing();
//       gameStats.playerTurn = false;
//       gameStats.playerIndex = -1;
//       gameStats.playerMoves = [];
//       gameFunctions.playCompMoves();
//     }
//   },
//   generateCompMoves: function() {
//     for (var i = 0; i < 2; i++) {
//       gameStats.compMoves.push(Math.floor(Math.random() * 4));
//     }
//   }
// };

// var eventTriggers = {
//   $startGame: $("#start").on('click', gameFunctions.startGame),
//   $reset: $("#reset").on('click', gameFunctions.resetGame),
//   $strictMode: $("#strictChk").on('click', function() {
//     if (!gameStats.strictMode) {
//       $(this).text("\u2713" + " Strict");
//       gameStats.strictMode = true;
//     } else {
//       $(this).text("Strict");
//       gameStats.strictMode = false;
//     }
//   }),
//   $enablePressing: function() {
//     $("#canvas1").on('click', pressColor.red);
//     $("#canvas2").on('click', pressColor.blue);
//     $("#canvas3").on('click', pressColor.yellow);
//     $("#canvas4").on('click', pressColor.green);
//   },
//   $disablePressing: function() {
//     $("#canvas1").off();
//     $("#canvas2").off();
//     $("#canvas3").off();
//     $("#canvas4").off();
//   }
// };

// var audioObj = {
//   redSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
//   blueSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
//   yellowSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
//   greenSound: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
// };

// var pressColor = {
//   red: function() {
//     audioObj.redSound.play();
//     drawingObj.drawSection(drawingObj.context1, '#FF4F4F', gameSize, gameSize, gameSize);
//     drawingObj.drawSection(drawingObj.context1, '#333', gameSize, gameSize, greyRadius);
//     setTimeout(function() {
//       drawingObj.context1.beginPath();
//       drawingObj.context1.fillStyle = "red";
//       drawingObj.context1.arc(gameSize, gameSize, gameSize, 0, 2.5 * Math.PI);
//       drawingObj.context1.fill();
//       drawingObj.context1.beginPath();
//       drawingObj.context1.fillStyle = '#333';
//       drawingObj.context1.arc(gameSize, gameSize, greyRadius, 0, 2.5 * Math.PI);
//       drawingObj.context1.fill();
//     }, 500);

//     if (gameStats.playerTurn) {
//       var moveIndex = $(this).attr('value');
//       gameFunctions.updatePlayerMove(moveIndex);
//       gameFunctions.checkPlayerMove();
//     }
//   },
//   blue: function() {
//     audioObj.blueSound.play();
//     drawingObj.drawSection(drawingObj.context2, '#4F4FFF', 0, gameSize, gameSize);
//     drawingObj.drawSection(drawingObj.context2, '#333', 0, gameSize, greyRadius);
//     setTimeout(function() {
//       drawingObj.context2.beginPath();
//       drawingObj.context2.fillStyle = "blue";
//       drawingObj.context2.arc(0, gameSize, gameSize, 0, 2.5 * Math.PI);
//       drawingObj.context2.fill();
//       drawingObj.context2.beginPath();
//       drawingObj.context2.fillStyle = '#333';
//       drawingObj.context2.arc(0, gameSize, greyRadius, 0, 2.5 * Math.PI);
//       drawingObj.context2.fill();
//     }, 500);

//     if (gameStats.playerTurn) {
//       var moveIndex = $(this).attr('value');
//       gameFunctions.updatePlayerMove(moveIndex);
//       gameFunctions.checkPlayerMove();
//     }
//   },
//   yellow: function() {
//     audioObj.yellowSound.play();
//     drawingObj.drawSection(drawingObj.context3, '#FFFF7F', gameSize, 0, gameSize);
//     drawingObj.drawSection(drawingObj.context3, '#333', gameSize, 0, greyRadius);
//     setTimeout(function() {
//       drawingObj.context3.beginPath();
//       drawingObj.context3.fillStyle = "yellow";
//       drawingObj.context3.arc(gameSize, 0, gameSize, 0, 2.5 * Math.PI);
//       drawingObj.context3.fill();
//       drawingObj.context3.beginPath();
//       drawingObj.context3.fillStyle = '#333';
//       drawingObj.context3.arc(gameSize, 0, greyRadius, 0, 2.5 * Math.PI);
//       drawingObj.context3.fill();
//     }, 500);

//     if (gameStats.playerTurn) {
//       var moveIndex = $(this).attr('value');
//       gameFunctions.updatePlayerMove(moveIndex);
//       gameFunctions.checkPlayerMove();
//     }
//   },
//   green: function() {
//     audioObj.greenSound.play();
//     drawingObj.drawSection(drawingObj.context4, '#408040', 0, 0, gameSize);
//     drawingObj.drawSection(drawingObj.context4, '#333', 0, 0, greyRadius);
//     setTimeout(function() {
//       drawingObj.context4.beginPath();
//       drawingObj.context4.fillStyle = "green";
//       drawingObj.context4.arc(0, 0, gameSize, 0, 2.5 * Math.PI);
//       drawingObj.context4.fill();
//       drawingObj.context4.beginPath();
//       drawingObj.context4.fillStyle = '#333';
//       drawingObj.context4.arc(0, 0, greyRadius, 0, 2.5 * Math.PI);
//       drawingObj.context4.fill();
//     }, 300);

//     if (gameStats.playerTurn) {
//       var moveIndex = $(this).attr('value');
//       gameFunctions.updatePlayerMove(moveIndex);
//       gameFunctions.checkPlayerMove();
//     }
//   }
// };

// var gameStats = {
//   strictMode: false,
//   round: 0,
//   playerTurn: false,
//   compMoves: [],
//   playerMoves: [],
//   compIndex: -1,
//   playerIndex: -1,
//   winner: false
// };


// //runs through the appropriate number of indices to be played on each turn of the computer
// function increaseIndex() {
//   ++gameStats.compIndex;
//   $("#score").text(gameStats.round).css("color", "white");
//   if (gameStats.compIndex >= gameStats.round) {
//     gameStats.compIndex = -1;
//     clearInterval(compPlay);
//     eventTriggers.$enablePressing();
//     gameStats.playerTurn = true;
//   }
//   switch (gameStats.compMoves[gameStats.compIndex]) {
//     case 0:
//       pressColor.red();
//       break;
//     case 1:
//       pressColor.blue();
//       break;
//     case 2:
//       pressColor.yellow();
//       break;
//     case 3:
//       pressColor.green();
//       break;
//                                                   }
// }
// init();

