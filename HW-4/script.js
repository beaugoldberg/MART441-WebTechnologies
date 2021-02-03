function tothepark() {
    document.getElementById('title').innerHTML  = "You found a buddy in the park that lives next door, you can follow him home to get yourself home!!";
    clearValue();
    document.getElementById('choice').placeholder = "Enter 'Follow'";
    document.getElementById("container").style.backgroundImage = "url(./images/dog-park2.jpg)";
    pugTransform(85,60,120,120);
    clearError();
}

function followhome() {
    var hometext = "Your owner found you on your way back home with your buddy." + "You made it home safe and sound!"
    document.getElementById('title').innerHTML = hometext;
    restartButton();
    document.getElementById('container').style.backgroundImage = "url('./images/apartment.jpg')";
    pugTransform(58,45,140,140);
    clearError();
}

function intothecity() {
    document.getElementById('title').innerHTML  = "You were found by a stranger who says they recognize you. Do you trust them or take off?";
    clearValue();
    document.getElementById('choice').placeholder = "Enter 'Trust' or 'Run'";
    document.getElementById("container").style.backgroundImage = "url(./images/streets2.jpg)";
    pugTransform(83,5,70,70);
    clearError();
}

function trust() {
    document.getElementById('title').innerHTML  = "Unfortunately you got kidnapped and taken to doggy jail!";
    restartButton();
    document.getElementById('container').style.backgroundImage = "url('./images/jail.jpg')";
    pugTransform(73.2,48,250,250);
    clearError();
}

function runaway() {
    document.getElementById('title').innerHTML  = "Your owner found you on his way home and takes you out for treats before going home!";
    restartButton();
    document.getElementById('container').style.backgroundImage = "url('./images/shop.jpg')";
    pugTransform(40,27.5,250,250);
    clearError();
}

function story() {
    var userChoice = getUserInput();
    if (userChoice == "Park" || userChoice == "park") { tothepark(); }
    else if (userChoice == "Follow" || userChoice == "follow") { followhome(); }
    else if (userChoice == "City" || userChoice == "city") { intothecity(); }
    else if (userChoice == "Trust" || userChoice == "trust") { trust(); }
    else if (userChoice == "Run" || userChoice == "run") { runaway(); }
    else {
        document.getElementById('error').innerHTML = '*Invalid response';
    }
}

var userInput;

function getUserInput() {
    userInput = document.getElementById('choice').value
    return userInput;
}

function clearError() {
    if (document.getElementById('error').innerHTML != '') { document.getElementById('error').innerHTML = ''; }
}

function restart() {
    window.location.reload();
}

function clearValue() {
    document.getElementById('choice').value = '';
}

function pugTransform(top, left, width, height) {
    document.getElementById('pug').style.top = top + '%';
    document.getElementById('pug').style.left = left + '%';
    document.getElementById('pug').style.width =  width + 'px';
    document.getElementById('pug').style.height = height + 'px';
}

function restartButton() {
    userInput = document.getElementById('choice').style.display = 'none';
    document.getElementById('btnSubmit').innerHTML = 'Restart?';
    document.getElementById('btnSubmit').onclick = restart;
}






