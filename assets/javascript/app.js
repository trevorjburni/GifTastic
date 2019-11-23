// Before we can do anything we need to create a string of topics

var topics = ["star wars", "harry potter", "lord of the rings", "spongebob"];
// api key
var apiKey = "EJ5KCZEq51nGGlNz0ACZlMruaXfNN8ae";

// loop through the topics array and create buttons and append those to the page.
for(var i = 0; i < topics.length; i++) {
    var buttonDiv = $(".buttons");

    var newButton = $("<button>");
    newButton.text(topics[i]);
    newButton.attr("id", topics[i]);
    buttonDiv.append(newButton);
};