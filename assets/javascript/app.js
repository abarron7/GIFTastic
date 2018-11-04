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
                var gameDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                var gameImage = $("<img>")
                gameImage.attr("src", results[i].images.fixed_height.url);

                gameDiv.append(p);
                gameDiv.prepend(gameImage);
            
                $("#gifs").prepend(gameDiv);
                function updateState(state, ele) {
                    $(ele).attr("src", $(ele).attr("data-" + state));
                    $(ele).attr("data-state", state);
                  }
                  $("img").on("click", function () {
                    var state = $(this).attr("data-state");
                    var dAnimate = $(this).attr("data-animate")
                    if (state === "still") {
                      updateState('animate', this);
                    } else {
                      updateState('still', this);
                    }
                  });
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
});
$(document).on("click", ".game-btn", displayGameInfo);

renderButtons();