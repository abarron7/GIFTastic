var topics = ["halo combat evolved", "gears of war", "the witcher", "pubg", "fortnite", "red dead redemption", "battlefield", "fifa", "madden"];

function displayGameInfo() {
    var game = $(this).attr("game-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        game + "&api_key=KvE6zJyzdwcwzmJ1gDKccOpV1Xscje0B&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log(queryURL);

            console.log(response);

            var results = response.data;


            for (var i = 0; i < results.length; i++) {
                var animated = results[i].images.fixed_height.url
                var still = results[i].images.fixed_height_still.url
                var gameDiv = $("<div id='gif'>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gameImage = $("<img>")
                gameImage.addClass("resultGif")
                gameImage.attr("src", still);
                gameImage.attr("data-state", "still");
                gameImage.attr("data-still", still);
                gameImage.attr("data-animate", animated);
                gameDiv.append(p);
                gameDiv.prepend(gameImage);
                $("#gifs").prepend(gameDiv);

            };
        });
};


function renderButtons() {
    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("game-btn");
        a.attr("game-name", topics[i]);
        a.text(topics[i]);
        $("#gif-buttons").append(a);
    };


};

$("#add-game").on("click", function (event) {
    event.preventDefault();
    var game = $("#game-input").val().trim();
    topics.push(game);
    renderButtons();
    $('#game-input').val("");
});
$(document).on("click", ".game-btn", displayGameInfo);

function playGifs() {
    var state = $(this).attr("data-state");
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
}
};
renderButtons();
$(document).on("click",".resultGif", playGifs);
