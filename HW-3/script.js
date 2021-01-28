function tothepark() {
    document.getElementById('title').innerHTML  = "You found a buddy in the park that lives next door, you can follow him home to get yourself home!!";
    document.getElementById('choice1').innerHTML = "Follow your friend home!";
    document.getElementById('choice2').style.display = 'none';
    document.getElementById("container").style.backgroundImage = "url(./images/dog-park2.jpg)";
    document.getElementById('pug').style.top = '85%';
    document.getElementById('pug').style.left = '60%';
    document.getElementById('pug').style.width = '120px';
    document.getElementById('pug').style.height = '120px';
}

function followhome() {
    var hometext = "Your owner found you on your way back home with your buddy." + "You made it home safe and sound!"
    document.getElementById('title').innerHTML  = hometext;
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('container').style.backgroundImage = "url('./images/apartment.jpg')"
    document.getElementById('pug').style.top = '58%';
    document.getElementById('pug').style.left = '45%';
    document.getElementById('pug').style.width = '140px';
    document.getElementById('pug').style.height = '140px';
}

function intothecity() {
    document.getElementById('title').innerHTML  = "You were found by a stranger who says they recognize you. Do you trust them or take off?";
    document.getElementById('choice1').innerHTML = "Trust the stranger";
    document.getElementById('choice2').innerHTML = 'Run away';
    document.getElementById("container").style.backgroundImage = "url(./images/streets2.jpg)";
    document.getElementById('pug').style.top = '83%';
    document.getElementById('pug').style.left = '5%';
    document.getElementById('pug').style.width = '70px';
    document.getElementById('pug').style.height = '70px';
}

function trust() {
    document.getElementById('title').innerHTML  = "Unfortunately you got kidnapped and taken to doggy jail!";
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('container').style.backgroundImage = "url('./images/jail.jpg')";
    document.getElementById('pug').style.top = '73.2%';
    document.getElementById('pug').style.left = '48%';
    document.getElementById('pug').style.width = '250px';
    document.getElementById('pug').style.height = '250px';
}

function runaway() {
    document.getElementById('title').innerHTML  = "Your owner found you on his way home and takes you out for treats before going home!";
    document.getElementById('choice1').style.display = 'none';
    document.getElementById('choice2').style.display = 'none';
    document.getElementById('container').style.backgroundImage = "url('./images/shop.jpg')";
    document.getElementById('pug').style.top = '40%';
    document.getElementById('pug').style.left = '27.5%';
    document.getElementById('pug').style.width = '250px';
    document.getElementById('pug').style.height = '250px';
}

function story(choice) {
    if (choice == 1 && document.getElementById('choice1').innerHTML == "To the park!") { tothepark(); }
    else if (choice == 1 && document.getElementById('choice1').innerHTML == "Follow your friend home!") { followhome(); }
    else if (choice == 2 && document.getElementById('choice2').innerHTML == "Into the city!") { intothecity(); }
    else if (choice == 1 && document.getElementById('choice1').innerHTML == "Trust the stranger") { trust(); }
    else if (choice == 2 && document.getElementById('choice2').innerHTML == "Run away") { runaway(); }
}