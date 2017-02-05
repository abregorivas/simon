var canvas1 = document.getElementById('canvas1'),
    canvas2 = document.getElementById('canvas2'),
    canvas3 = document.getElementById('canvas3'),
    canvas4 = document.getElementById('canvas4'),
    context1 = canvas1.getContext("2d"),
    context2 = canvas2.getContext("2d"),
    context3 = canvas3.getContext("2d"),
    context4 = canvas4.getContext("2d")

function drawSection(section, color, xCord, yCord, radius) {
  section.beginPath();
  section.fillStyle = color;
  section.arc(xCord, yCord, radius, 0, 2.5*Math.PI);
  section.fill();
}

//drawing the gameboard
 window.onload = function() {
    drawSection(context1, 'red', 100, 100, 100);
    drawSection(context1, '#333', 100, 100, 25);
    drawSection(context2, 'blue', 0, 100, 100);
    drawSection(context3, 'yellow', 100, 0, 100);
    drawSection(context4, 'green', 0, 0, 100);
    drawSection(context2, '#333', 0, 100, 25);
    drawSection(context3, '#333', 100, 0, 25);
    drawSection(context4, '#333', 0, 0, 25);
}

//game functions
function pressRed() {
  var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  redSound.play();
  drawSection(context1, '#FF4F4F', 100, 100, 100);
    drawSection(context1, '#333', 100, 100, 25);
  setTimeout(function(){
    context1.beginPath();
    context1.fillStyle = "red";
    context1.arc(100, 100, 100, 0, 2.5*Math.PI);
    context1.fill();
    context1.beginPath();
    context1.fillStyle = '#333';
    context1.arc(100, 100, 25, 0, 2.5*Math.PI);
    context1.fill();
  }, 500)
}

function pressBlue() {
  var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  blueSound.play();
  drawSection(context2, '#4F4FFF', 0, 100, 100);
  drawSection(context2, '#333', 0, 100, 25);
  setTimeout(function(){
    context2.beginPath();
    context2.fillStyle = "blue";
    context2.arc(0, 100, 100, 0, 2.5*Math.PI);
    context2.fill();
    context2.beginPath();
    context2.fillStyle = '#333';
    context2.arc(0, 100, 25, 0, 2.5*Math.PI);
    context2.fill();
  }, 500)
}

function pressYellow() {
  var yelloSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  yelloSound.play();
  drawSection(context3, '#FFFF7F', 100, 0, 100);
  drawSection(context3, '#333', 100, 0, 25);
  setTimeout(function(){
    context3.beginPath();
    context3.fillStyle = "yellow";
    context3.arc(100, 0, 100, 0, 2.5*Math.PI);
    context3.fill();
    context3.beginPath();
    context3.fillStyle = '#333';
    context3.arc(100, 0, 25, 0, 2.5*Math.PI);
    context3.fill();
  }, 500)
}

function pressGreen() {
  var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  greenSound.play();
  drawSection(context4, '#408040', 0, 0, 100);
  drawSection(context4, '#333', 0, 0, 25);
  setTimeout(function(){
    context4.beginPath();
    context4.fillStyle = "green";
    context4.arc(0, 0, 100, 0, 2.5*Math.PI);
    context4.fill();
    context4.beginPath();
    context4.fillStyle = '#333';
    context4.arc(0, 0, 25, 0, 2.5*Math.PI);
    context4.fill();
  }, 500)
}

//event handles
$("#canvas1").on('click', pressRed);
$("#canvas2").on('click', pressBlue);
$("#canvas3").on('click', pressYellow);
$("#canvas4").on('click', pressGreen);

function randomNumber(){
  switch(Math.floor(Math.random()*4)){
    case 0:
      pressRed();
      break;
    case 1:
      pressBlue();
      break;
    case 2:
      pressYellow();
      break;
    case 3:
      pressGreen();
      break;                                    }
}

var compMoves = [];
$("#start").on('click', randomNumber)

function generateCompMoves(){
  for(var i = 0; i < 20; i++){
    compMoves.push(Math.floor(Math.random()*4));
  }
}

generateCompMoves();
console.log(compMoves);

setTimeout(function(){


});
compMoves.forEach(function(el){
      el === 0 ?  pressRed() : 0;
      el === 1 ?  pressBlue() : 0;
      el === 2 ?  pressYellow() : 0;
      el === 3 ?  pressGreen() : 0;
});
