var cardIDs = ["card1","card2","card3","card4","card5","card6","card7","card8","card9","card10"];
var blankImage = "images/question.jpg";
var images = new Array();
var flips = 0;
var flipIndices = [0,0];
var score = 0;
var information = {"firstname": "", "lastname": "", "age": ""};
var attempts = 0;

function displayBlankImages() {
    createRandomArray();
}

function createRandomArray() {
    var imagePaths = ["images/anemone.jpg","images/dahlia.jpg","images/lavender.jpg","images/rose.jpg","images/tulip.jpg"];
    var imageDeckCount = [0,0,0,0,0];

    while (images.length < 10) {
        var index  = Math.floor(Math.random() * imagePaths.length)
        if (imageDeckCount[index] < 2) {
            images.push(imagePaths[index]);
            imageDeckCount[index] += 1;
        }
    }
}

function flipCard(index) {
    if (flips == 2) { checkForMatch(); }
    else {
        document.getElementById(cardIDs[index]).src = images[index];
        flipIndices[flips] = index;
        flips++;
    }
}

function resetFlippedCards() {
    document.getElementById(cardIDs[flipIndices[0]]).src = blankImage;
    document.getElementById(cardIDs[flipIndices[1]]).src = blankImage;
}

function checkForMatch() {
    if (images[flipIndices[0]] == images[flipIndices[1]]) { 
        score += 1;
        document.getElementById('score').innerHTML = "Score: " + score;
        disableClickOnMatch();
        resetCount();
    }
    else {
        resetFlippedCards();
        resetCount();
    }
    if (score == 5) { 
        var info = localStorage.getItem("info");
        information = JSON.parse(info);
        information.attemptsEnd = attempts;
        localStorage.setItem("info", JSON.stringify(information));
        window.location = "endpage.html"; 
    }
    else { attempts++; }
}

function disableClickOnMatch() {
    document.getElementById(cardIDs[flipIndices[0]]).onclick = null;
    document.getElementById(cardIDs[flipIndices[1]]).onclick = null;
}

function resetCount() {
    flips = 0;
    flipIndices = [0,0];
}

function startGame() {
    if (document.getElementById('fname').value != "" && document.getElementById('lname').value != "" && document.getElementById('age').value != "") {
        information.firstname = document.getElementById('fname').value;
        information.lastname = document.getElementById('lname').value;
        information.age = document.getElementById("age").value;
        localStorage.setItem("info", JSON.stringify(information));

        window.location = "index.html";
    }
    else {
        document.getElementById('errMsg').innerHTML = "*Invalid Input";
    }
}


function displayResults() {
    var info = localStorage.getItem("info");
    information = JSON.parse(info);

    document.getElementById('name').innerHTML = "Name: " + information.firstname + " " + information.lastname;
    document.getElementById('age2').innerHTML = "Age: " + information.age;
    document.getElementById('attemptsFinal').innerHTML = "Attempts: " + information.attemptsEnd;

}