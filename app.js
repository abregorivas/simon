var drawingObj = {
    canvas1: document.getElementById('canvas1'),
    canvas2: document.getElementById('canvas2'),
    canvas3: document.getElementById('canvas3'),
    canvas4: document.getElementById('canvas4'),
    context1: canvas1.getContext("2d"),
    context2: canvas2.getContext("2d"),
    context3: canvas3.getContext("2d"),
    context4: canvas4.getContext("2d"),
    drawSection: function(section, color, xCord, yCord, radius) {
        section.beginPath();
        section.fillStyle = color;
        section.arc(xCord, yCord, radius, 0, 2.5 * Math.PI);
        section.fill();
    }
}


$("#reset").on('click', resetGame);
$("input").on('click', setStrictMode);


function setStrictMode() {
    if ($(this).is(':checked')) {
        gameStats.strictMode = true;
    } else {
        gameStats.strictMode = false;
    }
    console.log(gameStats.strictMode);
}

function enablePressing() {
    $("#canvas1").on('click', pressRed);
    $("#canvas2").on('click', pressBlue);
    $("#canvas3").on('click', pressYellow);
    $("#canvas4").on('click', pressGreen);
}

function disablePressing() {
    $("#canvas1").off();
    $("#canvas2").off();
    $("#canvas3").off();
    $("#canvas4").off();
}
//drawing the gameboard
window.onload = function() {
    drawingObj.drawSection(drawingObj.context1, 'red', 100, 100, 100);
    drawingObj.drawSection(drawingObj.context1, '#333', 100, 100, 25);
    drawingObj.drawSection(drawingObj.context2, 'blue', 0, 100, 100);
    drawingObj.drawSection(drawingObj.context3, 'yellow', 100, 0, 100);
    drawingObj.drawSection(drawingObj.context4, 'green', 0, 0, 100);
    drawingObj.drawSection(drawingObj.context2, '#333', 0, 100, 25);
    drawingObj.drawSection(drawingObj.context3, '#333', 100, 0, 25);
    drawingObj.drawSection(drawingObj.context4, '#333', 0, 0, 25);
}

//game functions
function pressRed() {
    var redSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    redSound.play();
    drawSection(context1, '#FF4F4F', 100, 100, 100);
    drawSection(context1, '#333', 100, 100, 25);
    setTimeout(function() {
        context1.beginPath();
        context1.fillStyle = "red";
        context1.arc(100, 100, 100, 0, 2.5 * Math.PI);
        context1.fill();
        context1.beginPath();
        context1.fillStyle = '#333';
        context1.arc(100, 100, 25, 0, 2.5 * Math.PI);
        context1.fill();
    }, 500);

    if (gameStats.playerTurn) {
        var moveIndex = $(this).attr('value');
        updatePlayerMove(moveIndex);
        checkPlayerMove();
    }

}

function pressBlue() {
    var blueSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    blueSound.play();
    drawSection(context2, '#4F4FFF', 0, 100, 100);
    drawSection(context2, '#333', 0, 100, 25);
    setTimeout(function() {
        context2.beginPath();
        context2.fillStyle = "blue";
        context2.arc(0, 100, 100, 0, 2.5 * Math.PI);
        context2.fill();
        context2.beginPath();
        context2.fillStyle = '#333';
        context2.arc(0, 100, 25, 0, 2.5 * Math.PI);
        context2.fill();
    }, 500);

    if (gameStats.playerTurn) {
        var moveIndex = $(this).attr('value');
        updatePlayerMove(moveIndex);
        checkPlayerMove();
    }
}

function pressYellow() {
    var yelloSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    yelloSound.play();
    drawSection(context3, '#FFFF7F', 100, 0, 100);
    drawSection(context3, '#333', 100, 0, 25);
    setTimeout(function() {
        context3.beginPath();
        context3.fillStyle = "yellow";
        context3.arc(100, 0, 100, 0, 2.5 * Math.PI);
        context3.fill();
        context3.beginPath();
        context3.fillStyle = '#333';
        context3.arc(100, 0, 25, 0, 2.5 * Math.PI);
        context3.fill();
    }, 500);

    if (gameStats.playerTurn) {
        var moveIndex = $(this).attr('value');
        updatePlayerMove(moveIndex);
        checkPlayerMove();
    }
}

function pressGreen() {
    var greenSound = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    greenSound.play();
    drawSection(context4, '#408040', 0, 0, 100);
    drawSection(context4, '#333', 0, 0, 25);
    setTimeout(function() {
        context4.beginPath();
        context4.fillStyle = "green";
        context4.arc(0, 0, 100, 0, 2.5 * Math.PI);
        context4.fill();
        context4.beginPath();
        context4.fillStyle = '#333';
        context4.arc(0, 0, 25, 0, 2.5 * Math.PI);
        context4.fill();
    }, 300);

    if (gameStats.playerTurn) {
        var moveIndex = $(this).attr('value');
        updatePlayerMove(moveIndex);
        checkPlayerMove();
    }
}
//game functionality
$("#start").on('click', startGame);

var gameStats = {
    strictMode: false,
    round: 0,
    score: 0,
    playerAttempts: 0,
    playerTurn: false,
    compMoves: [],
    playerMoves: [],
    compIndex: -1,
    playerIndex: -1,
    generateCompMoves: function() {
        for (var i = 0; i < 20; i++) {
            this.compMoves.push(Math.floor(Math.random() * 4));
        }
    }
}

function resetGame() {
    console.log("clicked");
    gameStats.round = 0;
    gameStats.score = 0;
    gameStats.playerTurn = false;
    gameStats.compMoves = [];
    gameStats.playerMoves = [];
    gameStats.compIndex = -1;
    gameStats.playerIndex = -1;
    disablePressing();
    $("#score").text(0);
}

function increaseIndex() {
    $("#score").text(gameStats.round);
    ++gameStats.compIndex;
    if (gameStats.compIndex >= gameStats.round) {
        gameStats.compIndex = -1;
        clearInterval(compPlay);
        enablePressing();
        gameStats.playerTurn = true;
    }
    switch (gameStats.compMoves[gameStats.compIndex]) {
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
            break;
    }

}

function startGame() {
    gameStats.generateCompMoves();
    gameStats.round += 1;
    console.log(gameStats.compMoves);
    compPlay = setInterval(increaseIndex, 1000);
    console.log(gameStats.playerIndex);
    console.log("mode=" + gameStats.strictMode);
    $(this).off();
}

function playCompMoves() {
    gameStats.round += 1;
    compPlay = setInterval(increaseIndex, 1000);
}

function replayLastCompMoves() {
    compPlay = setInterval(increaseIndex, 1000);
}

function updatePlayerMove(indexPlayed) {
    gameStats.playerMoves.push(indexPlayed);
    gameStats.playerIndex += 1;
    gameStats.playerAttempts += 1;
    console.log("PlayerUpdated");
    console.log("mode=" + gameStats.strictMode);
    console.log(gameStats.playerTurn);
    console.log("PlayerIndex" + gameStats.playerIndex);
    console.log("playerMoves" + gameStats.playerMoves[gameStats.playerIndex]);
    console.log("compMoves" + gameStats.compMoves[gameStats.playerIndex]);

}

function checkPlayerMove() {
    console.log("checkPlayer");
    // console.log("round" + (gameStats.round));
    // console.log("len" + gameStats.playerMoves.length);
    // console.log("compIndex" + gameStats.compIndex);
    // console.log("PlayerIndex1" + gameStats.playerIndex);
    // console.log("playerMoves1" + gameStats.playerMoves[gameStats.playerIndex]);
    // console.log("compMoves1" + gameStats.compMoves[gameStats.playerIndex]);
    console.log("mode=" + gameStats.strictMode);

    if (gameStats.strictMode) {
        console.log("strChkmode=" + gameStats.strictMode);
        strictModeCheckPlayerMove();
        console.log("check0");
    } else {

        if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]) {
            disablePressing();
            gameStats.playerTurn = false;
            gameStats.playerIndex = -1;
            gameStats.playerMoves = [];
            console.log("You did not match");
            $("#score").text("!!");
            setTimeout(replayLastCompMoves, 500);
            console.log("check1");
        }

        if (gameStats.round == gameStats.playerMoves.length) {
            disablePressing();
            gameStats.playerTurn = false;
            gameStats.playerIndex = -1;
            gameStats.playerMoves = [];
            console.log("compTurn");
            playCompMoves();
            console.log("check3");
        }
    }
}

//strict mode game logic
function strictModeCheckPlayerMove() {
    if (gameStats.playerMoves[gameStats.playerIndex] != gameStats.compMoves[gameStats.playerIndex]) {
        resetGame();
        console.log("check4");
    } else if (gameStats.round == gameStats.playerMoves.length) {
        disablePressing();
        gameStats.playerTurn = false;
        gameStats.playerIndex = -1;
        gameStats.playerMoves = [];
        console.log("compTurn");
        playCompMoves();
        console.log("check5");
    }
}
