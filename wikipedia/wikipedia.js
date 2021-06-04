// Docs & References
// https://en.wikipedia.org/wiki/Lists_of_National_Basketball_Association_players
// https://www.mediawiki.org/wiki/API:Main_page

var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var query = searchBar.value;

var api =
  "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=10&gsrsearch=";

var url = ""; // set url from outside addEventListener function

submitBtn.addEventListener("click", function (e) { // listen for click on submit button
  $("#searchResults").empty(); // clear search results
  e.preventDefault(); // prevent default behavior of submit button

  if (searchBar.value === "") { // if search bar is empty
    searchBar.classList.add("animated", "shake", "alert"); // add the alert class
    setTimeout(function () {
      searchBar.classList.remove("animated", "shake", "alert"); // remove alert after animation complete
    }, 750);

  } else {
    var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, "_") + "%27"; // replace whitespaces with underscores

    console.log(apiUrl);
    console.log('User Query:', searchBar.value); // log users search query
    localStorage.setItem("User Query", searchBar.value);
    console.log(localStorage);

    searchBar.value = ""; // clear search bar
    url = apiUrl; // set url to apiUrl

    searchResults(apiUrl); // call searchResults, passing in the apiUrl
  }
});

function searchResults(url) {
  $.ajax({
    url: url,
    success: function (result) {
      // console.log('Result:', result); // Returns full result object
      // console.log('Pages:', result.query.pages); // Returns result pages within result object

      for (var i in result.query.pages) { // loop through all pages within result object

        console.log(result.query.pages[i].title); // lets see what wiki returns 

        var searchResults = document.getElementById("searchResults");
        var resultsLi = document.createElement("li"); // create li element for all page titles

        resultsLi.className = "singleResult"; // add class to all li elements
        resultsLi.style.display = "none"; // hide li by default
        resultsLi.innerHTML =
          "<p>" + result.query.pages[i].title.toLowerCase() + "</p>"; // add title text to lis
        searchResults.appendChild(resultsLi); // append lis to searchResults div

        $(resultsLi).wrap(function () { // wrap li with corresponding wiki url
          return (
            '<a target="_blank" href="https://en.wikipedia.org/wiki/' +
            result.query.pages[i].title +
            '"></a>'
          );
        });

        $(resultsLi).fadeIn(1000); // fade in hidden lis
      }
    },
  });
}

