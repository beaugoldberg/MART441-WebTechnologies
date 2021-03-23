// ----------------------------------------
// Global Variables
// ----------------------------------------
var user, auto;
var directionX = 1; var directionY = 1;
var movementLengthX = 5; var movementLengthY = 5;
var moveSpeed = 20;

var squareEnemies = new Array();
var collectiblesObjects = new Array();
var collectibleIndex;
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

function update() {
    drawSquare(user, auto, squareEnemies, collectiblesObjects);
}

function drawSquare(user, auto, squareEnemies) {
    ctx.clearRect(0,0,1280,720);
    ctx.fillStyle = user.Color;
    ctx.fillRect(user.X,user.Y,user.W,user.H);
    ctx.fillStyle = auto.Color;
    updateSquarePos(auto);
    ctx.fillRect(auto.X,auto.Y,auto.W,auto.H);

    for (var i = 0; i < squareEnemies.length; i++) {
        ctx.fillStyle = squareEnemies[i].Color;
        ctx.fillRect(squareEnemies[i].X,squareEnemies[i].Y,squareEnemies[i].W,squareEnemies[i].H);
    }

    for (var i = 0; i < collectiblesObjects.length; i++) {
        ctx.fillStyle = collectiblesObjects[i].Color;
        ctx.fillRect(collectiblesObjects[i].X,collectiblesObjects[i].Y,collectiblesObjects[i].W,collectiblesObjects[i].H);
    }
}

function getKey(event)
{
    var char = event.which || event.keyCode;
    var actualLetter = String.fromCharCode(char);
    if (actualLetter == "w") { moveUp(); }
    else if (actualLetter == "s") { moveDown(); }
    else if (actualLetter == "a") { moveLeft(); }
    else if (actualLetter == "d") { moveRight(); }

    var collided = hasCollided(user,auto);
    var collidedObject = false;
    var collidedCollectible = false;
    for (var i = 0; i < squareEnemies.length;i++) {
        if (hasCollided(user, squareEnemies[i])) { collidedObject = true;}
    }

    for (var i = 0; i < collectiblesObjects.length;i++) {
        if (hasCollided(user, collectiblesObjects[i])) { collidedCollectible = true; collectibleIndex = i; }
    }

    if (collided) 
    {
        $("body").css("background-color",getRandomColor());
        var char = event.which || event.keyCode;
        var actualLetter = String.fromCharCode(char);
        if (actualLetter == "w") { moveDown(); }
        else if (actualLetter == "s") { moveUp(); }
        else if (actualLetter == "a") { moveRight(); }
        else if (actualLetter == "d") { moveLeft(); }
        setRandomScale(user,auto);
        drawSquare(user, auto, squareEnemies, collectiblesObjects);
        collided = false;
    }
    else if (collidedObject) {
        var char = event.which || event.keyCode;
        var actualLetter = String.fromCharCode(char);
        if (actualLetter == "w") { moveDown(); moveDown(); }
        else if (actualLetter == "s") { moveUp(); moveUp();}
        else if (actualLetter == "a") { moveRight(); moveRight();}
        else if (actualLetter == "d") { moveLeft(); moveLeft(); }
        drawSquare(user, auto, squareEnemies, collectiblesObjects);
        collidedObject = false;
    }   
    else if (collidedCollectible) {
        collectiblesObjects.splice(collectibleIndex,1);
        score += 1;
        drawSquare(user, auto, squareEnemies, collectiblesObjects);
        $("label").html("Score: " + score);
    }
}

function moveUp() { if (user.Y - moveSpeed >= 0) { user.setY(user.Y -= moveSpeed);} }
function moveDown() { if (user.Y + user.H + moveSpeed <= 720) { user.setY(user.Y += moveSpeed);} }
function moveLeft() { if (user.X - moveSpeed >= 0) { user.setX(user.X -= moveSpeed);} }
function moveRight() { if (user.X + user.W + moveSpeed <= 1280) { user.setX(user.X += moveSpeed);} }

function hasCollided(user, auto) {
    return !(
        ((user.Y + user.H) < (auto.Y)) ||
        (user.Y > (auto.Y + auto.H)) ||
        ((user.X + user.W) < auto.X) ||
        (user.X > (auto.X + auto.W))
    );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomScale(user, auto) {
    var random = randomNumber(80,20); 
    var random2 =  randomNumber(60,60);  
    var userXrand = randomNumber(1180);
    var userYrand = randomNumber(620);
    var autoXrand = randomNumber(1180);
    var autoYrand = randomNumber(620);
    user.setW(random); user.setH(random);
    user.setX(userXrand); user.setY(userYrand);
    auto.setW(random2); auto.setH(random2);
    auto.setX(autoXrand); auto.setY(autoYrand);
}

function randomNumber(range, offset = 1) { return Math.floor(Math.random() * range + offset); }

function updateSquarePos(auto) {

    if (auto.X + movementLengthX >= 1280 - auto.W || auto.X - movementLengthX <= 0) { directionX *= -1; }
    if (auto.Y - movementLengthY <= 0 || auto.Y >= 720 - auto.H) { directionY *= -1; }

    auto.setX(auto.X + (movementLengthX * directionX));
    auto.setY(auto.Y + (movementLengthY * directionY));
}

// ----------------------------------------
// Main Script
// ----------------------------------------
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); 

user = new Square(50,50,30,30,"blue");
ctx.fillStyle = user.Color;
ctx.fillRect(user.X,user.Y,user.W,user.H);

auto = new Square(300,300,100,100,"red");
ctx.fillStyle = auto.Color;
ctx.fillRect(auto.X,auto.Y,auto.W,auto.H);

$.getJSON("files/objects.json", function(data) {
    for (var i = 0; i < data.squares.length; i++) {
        squareEnemies.push(new Square(data.squares[i].x,data.squares[i].y,data.squares[i].w,data.squares[i].h,data.squares[i].color));
    }
    drawSquare(user,auto, squareEnemies, collectiblesObjects);
})

$.getJSON("files/collectibles.json", function(data) {
    for (var i = 0; i < data.collectibles.length; i++) {
        collectiblesObjects.push(new Square(data.collectibles[i].x,data.collectibles[i].y,data.collectibles[i].w,data.collectibles[i].h,data.collectibles[i].color));
    }
    drawSquare(user,auto, squareEnemies, collectiblesObjects);
})

drawSquare(user, auto, squareEnemies, collectiblesObjects);
setInterval(update, 1000/60);



