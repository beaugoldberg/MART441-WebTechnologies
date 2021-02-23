var images = [];
var titles = ['Constitution Sqaure','Rock N Roll Hall of Fame', 'Monastary, India', 'Petra, Jordan','Taktsang Monastery'];
var links = ['./images/constitution-square.jpg','./images/rnr-hof.jpg','./images/monastary.jpg','./images/petra.jpg','./images/taktsang.jpg'];
var descriptions = ['Constitution Square in Ottawa Canada','The Rock and Roll Hall of Fame in Cleveland','A key monastary in India','Ancient temples in Petra, Jordan','Breathtaking shot of Taktsang Monastery'];
var authors = ['Marc-Olivier Jodoin','Lance Anderson','Samantha Hentosh','Jorge Fernandez Salas','Adli Wahlid'];
var year = ['2019','2020','2018','2017','2015'];

function initializeArray() {
    createImages();
    displayRandomImage();
}

function displayRandomImage() {
    var randomNum = Math.floor(Math.random() * 5);
    document.getElementById('mainImage').src = images[randomNum].imagelink;
    document.getElementById('title1').innerHTML = images[randomNum].displayTitle();
    document.getElementById('description1').innerHTML = images[randomNum].displayInfo();
}

function createImages() {
    for (var i = 0; i < titles.length; i++) {
        var pic = new Picture(titles[i],links[i],descriptions[i],authors[i],year[i]);
        images.push(pic);
    }
}