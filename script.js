var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x = canvas.width/2;
var y = canvas.height-30;

var dx = 5;
var dy = -5;

var ballRadius = 10;


var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if (y < ballRadius) {
        dy = -dy;
    } else if (x < ballRadius || x > canvas.width-ballRadius) {
        dx = -dx;
    } else if (y > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }

    x += dx;
    y += dy;
    
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    drawPaddle();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


var interval = setInterval(draw, 10);
