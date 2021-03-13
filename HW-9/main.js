$.fn.whiteColor = function() {
    this.css("color", "white");
    return this;
};

$(document).ready(function(){
    $("button").click(function(){
        $.getJSON("prize.json", function(result){
            $.each(result, function(i, field){
                var year;
                var category;
                var winners = new Array;
                var motivations;
                var str, message;
                var surname;
                var curHTML;
                var contentID;

                for (var m = 0; m < field.length; m ++) {
                    contentID = "div" + m;
                    console.log(contentID);
                    year = field[m].year;
                    category = field[m].category;

                    if (field[m].overallMotivation != 'undefined' && field[m].laureates != null) {
                        for (var j = 0; j < field[m].laureates.length; j++) {
                            if (field[m].laureates[j].surname != null) { surname = field[m].laureates[j].surname; }
                            else { surname = ""; }
                            winners.push(field[m].laureates[j].firstname + " " + surname);
                        }
                        motivations = field[m].laureates[0].motivation;
    
                        str = makeLaureatesString(winners);
                        message = "In " + year + ", " + str + " won the Nobel Prize in " + category + " " + motivations;
    
                        curHTML = $("#mainbody").html();
                        $("#mainbody").html(curHTML + "<div class='prize' id='" + contentID + "'>" + message + "</div>");
                        contentID = "#" + contentID;
                        $(contentID).whiteColor();
    
                        winners = [];
                    }
                    else {
                        message = "No Nobel Prize was awarded this year";
                        curHTML = $("#mainbody").html();
                        contentID = "#" + contentID;
                        $("#mainbody").html(curHTML + "<div class='prize' id='" + contentID + "'>" + message + "</div>");
                        $(contentID).whiteColor();
                    }
                }
            });
        });
    });
});

function makeLaureatesString(laureates) {
    var str = "[";
    for (var i = 0; i < laureates.length; i++) {
        if (i != laureates.length - 1) { str += (laureates[i] + ", "); }
        else { str += laureates[i]; }
    }
    str += "]";
    return str;
}