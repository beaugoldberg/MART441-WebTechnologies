var curImage = 0;
var images = new Array();
var links = ['./images/blue-streak.jpg','./images/lb-streaks.jpg','./images/red-orange.jpg'];
var quotes = ["'The Pessimist Sees Difficulty In Every Opportunity. The Optimist Sees Opportunity In Every Difficulty.' – Winston Churchill", 
              "'If You Are Working On Something That You Really Care About, You Don't Have To Be Pushed. The Vision Pulls You.' – Steve Jobs", 
              "'People Who Are Crazy Enough To Think They Can Change The World, Are The Ones Who Do.' – Rob Siltanen"];
var colors = ["white", "black", "orange"];


function initializeArray() {
    createImages();
    console.log(images[0]);
}

function createImages() {
    for (var i = 0; i < links.length; i++) {
        var pic = new Picture(links[i],quotes[i]);
        images.push(pic);
    }
}

function nextImage() {
    if (curImage == images.length - 1) { curImage = 0; }
    else { curImage += 1; }

    $("#main").css("background-image", "url(" + images[curImage].imgLink + ")").fadeOut("slow").fadeIn("slow");
    $("#quote").text(images[curImage].imgQuote);
    $("#quote").css("color",colors[curImage]);
    $("#square").css("border-color",colors[curImage]);
    $("#square2").css("border-color",colors[curImage]);
    console.log(curImage);
}

$(document).ready(function () {
    $("#square2").animate({left:1440}).animate({top:200});
    $("#square").animate({left:320});
    $("#main").css("background-image", "url(" + images[curImage].imgLink + ")");
    $("#quote").text(images[curImage].imgQuote);
    $("#quote").css("color",colors[curImage]);
    $("#square").css("border-color",colors[curImage]);
    $("#square2").css("border-color",colors[curImage]);
    setInterval(moveSquare,2000);
    setInterval(moveSquare2,2000);
    setInterval(nextImage,10000);
});

function moveSquare()
{
    $("#square").animate({left:320}).animate({top:330}).animate({top:600}).animate({left:1000});
}

function moveSquare2() {
    $("#square2").animate({left:1440}).animate({top:480}).animate({top:200}).animate({left:1440}).animate({left:760});
}