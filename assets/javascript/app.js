// Before we can do anything we need to create a string of topics

var topics = ["star wars", "harry potter", "lord of the rings", "spongebob", "top gun"];
// giphy api key
var apiKey = "EJ5KCZEq51nGGlNz0ACZlMruaXfNN8ae";

// loop through the topics array and create buttons and append those to the page.
for (var i = 0; i < topics.length; i++) {
    // reference to the .buttons div
    var buttonDiv = $(".buttons");

    // reference to a new button tag
    var newButton = $("<button>");

    // add text and attributes to the new button
    newButton.text(topics[i]);
    newButton.attr("class", "searchButton");
    newButton.attr("id", topics[i]);

    // add the new button to the .buttons div
    buttonDiv.append(newButton);
};


// create a button event listener that will create a new button with what is specified in the text box.


$("#submit").on("click", function () {
    var newSearch = $("#new-gif").val().trim().toLowerCase();
    console.log(newSearch);
    topics.push(newSearch);
    console.log(topics);
    // reference to the .buttons div
    buttonDiv = $(".buttons");

    // reference to a new button tag
    newButton = $("<button>");

    // add text and attributes to the new button
    newButton.text(newSearch);
    newButton.attr("class", "searchButton");
    newButton.attr("id", newSearch);

    // add the new button to the .buttons div
    buttonDiv.append(newButton);
});

// create a button event listener that will grab gifs from giphy and append those to the page.
$(".buttons").on("click", ".searchButton", function () {
    // reference the value of the id attribute of the clicked button
    console.log("search started");
    var search = $(this).attr("id");
    //create the url
    var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search + "&limit=10";
    // actually make our query or ajax call
    $.ajax({
            url: giphyUrl,
            method: "GET"
        })
        //when we get the data run the following code
        .then(function (response) {
            var results = response.data;
            console.log(results);

            // loop over all the results
            for (var i = 0; i < results.length; i++) {

                // Only show appropriate gifs
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var gifImage = $("<img>");

                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(gifImage);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $(".gifs").prepend(gifDiv);
                }
            }
        })
});