// ----------------------------------------
// Global Variables
// ----------------------------------------
// Player Variables
var player;
var playerX = 500, playerY = 670;
var moveSpeed = 20;

// Brick Variables
var bricks = new Array();
var brickH = 50, brickW = 100;
var numBricks = 40;
var brickGap = 10;
var brickB, brickT, brickR, brickL;

// Ball Variables
var ball;
var speedInitalOptions = new Array();
var directionX, directionY;
var moveSpeedBall = 4;
var ballB, ballT, ballR, ballL;

// Game Variables
var gameOver = false;
var win = false;
var b_collsion, t_collision, r_collision, l_collision;
var score = 0;

// ----------------------------------------
// Classes
// ----------------------------------------
class Square {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }

    setX(x) { this.x = x; }
    get X() { return this.x; }

    setY(y) { this.y = y; }
    get Y() { return this.y; }

    setW(w) { this.w = w; }
    get W() { return this.w; }

    setH(h) { this.h = h; }
    get H() { return this.h; }

    setColor(color) { this.color = color; }
    get Color() { return this.color; }
}

// ----------------------------------------
// Functions
// ----------------------------------------
$(document).ready(function(){
    $(this).keypress(function(event){
        getKey(event);
    });
});

function getKey(event)
{
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    if (actualLetter == "a") { moveLeft(); }
    else if (actualLetter == "d") { moveRight(); }
}

function moveLeft() { if (player.X - moveSpeed >= 0) { player.setX(player.X -= moveSpeed);} }
function moveRight() { if (player.X + player.W + moveSpeed <= 1280) { player.setX(player.X += moveSpeed);} }

function update() {
    if (!gameOver) {
        if (bricks.length == 0) { gameOver = true; }
        drawSquare(player);
        drawBricks(bricks);
        drawBall(ball);
        ballMovement(ball);
        CheckCollision();
        WinCheck();
        drawScore();
    }
    else if (win) {
        ctx.font = "120px Arial";
        ctx.fillStyle = "yellow";
        ctx.fillText("You Win!", canvas.width/2 - 250, canvas.height/2 - 80);
        ctx.fillText("Final Score: " + score.toString(), canvas.width/2 - 350, canvas.height/2 + 50);
    }
    else {
        ctx.font = "120px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Game Over", canvas.width/2 - 300, canvas.height/2 + 50);
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score.toString(), 10, 20);
}

function drawSquare(player) {
    ctx.clearRect(0,0,1280,720);
    ctx.fillStyle = player.Color;
    ctx.fillRect(player.X,player.Y,player.W,player.H);
}

function drawBricks(bricks) {
    for (var i = 0; i < bricks.length; i++) {
        ctx.fillStyle = bricks[i].Color;
        ctx.fillRect(bricks[i].X,bricks[i].Y,bricks[i].W,bricks[i].H);
    }
}

function drawBall(ball) {
    ctx.fillStyle = ball.Color;
    ctx.fillRect(ball.X,ball.Y,ball.W,ball.H);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function CreateBricks() {
    var initialX = 100; var initialY = 50;
    for (var i = 0; i < numBricks; i++) {
        if (numBricks > 10 && i % 10 == 0 && i != 0) { initialY += (brickH + brickGap); initialX = 100; }
        bricks.push(new Square(initialX,initialY,brickW,brickH,getRandomColor()));
        initialX += (brickW + brickGap);
    }
}

function ballMovement(ball) {
    if (ball.X + directionX * moveSpeedBall < 0 || ball.X + ball.W + directionX * moveSpeedBall > 1280) { directionX *= -1; }
    else { ball.setX(ball.X += directionX * moveSpeedBall); }

    if (ball.Y + directionY * moveSpeedBall < 0) { directionY *= -1; }
    else { ball.setY(ball.Y += directionY * moveSpeedBall); }

    if (ball.Y + directionY * moveSpeedBall > 720) { gameOver = true; }
}

// Collision Detection Credit Help 
// https://stackoverflow.com/questions/5062833/detecting-the-direction-of-a-collision

function hasCollided(ball, object) {
    ballB = ball.Y + ball.H;
    ballT = ball.Y;
    ballR = ball.X + ball.W;
    ballL = ball.X;
    brickB = object.Y + object.H;
    brickT = object.Y;
    brickR = object.X + object.W;
    brickL = object.X;

    b_collision = brickB - ballT;
    t_collision = ballB - brickT;
    l_collision = ballR - brickL;
    r_collision = brickR - ballL;

    return !(
        ((ball.Y + ball.H) < (object.Y)) ||
        (ball.Y > (object.Y + object.H)) ||
        ((ball.X + ball.W) < object.X) ||
        (ball.X > (object.X + object.W))
    );
}


function CheckCollision() {
    // Check Collision Between Ball and Player
    if (hasCollided(ball, player)) {
        directionY *= -1;
    }
    for (var i = 0; i < bricks.length; i++) {
        if (hasCollided(ball, bricks[i])) {
            //if (hasCollidedX) { directionX *= -1; hasCollidedX = false; }
            //else if (hasCollidedY) { directionY *= -1; hasCollidedY = false; }
            if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision) { directionY *= -1; }
            else if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision) { directionY *= -1; }                   
            else if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision) { directionX *= -1; }  
            else if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision ) { directionX *= -1; }  
            bricks.splice(i,1);
            score += 1;
            break;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function initializeSpeed() {
    speedInitalOptions.push(-1);
    speedInitalOptions.push(1);

    directionX = speedInitalOptions[getRandomInt(0,1)];
    directionY = -1;
}

function WinCheck()
{
    if (bricks.length == 0) { win = true; }
}

// ----------------------------------------
// Main Script
// ----------------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 

player = new Square(playerX,playerY,120,20,"blue");
ball = new Square(getRandomInt(200,1000),600,25,25,"black");

initializeSpeed();

drawSquare(player);
CreateBricks();
drawBricks(bricks);
drawBall(ball);
setInterval(update, 1000/60);