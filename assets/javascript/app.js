var topics = ["halo", "gears of war", "the witcher", "pubg", "fortnite", "red dead redemption", "battlefield", "fifa", "madden"];

function buildQueryURL() {
    var queryURL = "https://api.giphy.com/v1/gifs/search" //&limit=10
    var queryParams = {
        "api-key": "KvE6zJyzdwcwzmJ1gDKccOpV1Xscje0B"
    };

    queryParams.q = $("#search-term")
        .val()
        .trim();

    console.log("---------------\nURL: " + queryURL + "\n---------------");
    console.log(queryURL + $.param(queryParams));
    return queryURL + $.param(queryParams);
};
/** $.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
        var gameDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
    };

});*/

function renderButtons() {
    $("#gif-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("game-btn");
        a.attr("data-name", topics[i]);
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
renderButtons();