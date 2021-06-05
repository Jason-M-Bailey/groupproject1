// Docs & References
// https://en.wikipedia.org/wiki/Lists_of_National_Basketball_Association_players
// https://www.mediawiki.org/wiki/API:Main_page

var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var query = searchBar.value;
var recentSearch = JSON.parse(localStorage.getItem("results")) || [];

// keep recent search display as 5 results
// if statement to determine if anything in recent search
for (let index = recentSearch.length - 1; index > 0; index--) {
  console.log(recentSearch[index]);
  var defaultResults = document.getElementById("defaultSearches");
  var defaultLi = document.createElement("li");

  defaultLi.className = "singleResult";
  defaultLi.innerHTML = recentSearch[index];

  defaultResults.appendChild(defaultLi);
  // location.reload(); // uncomment this when you use onclick
}

var api = "";

// listen for click on submit button
submitBtn.addEventListener("click", function (e) {
  $("#searchResults").empty(); // clear search results
  e.preventDefault(); // prevent default behavior of submit button

  // if search bar is empty
  if (searchBar.value === "") {
    searchBar.classList.add("animated", "shake", "alert"); // add the alert class
    setTimeout(function () {
      searchBar.classList.remove("animated", "shake", "alert"); // remove alert after animation complete
    }, 750);
  } else {
    var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, "_") + "%27"; // replace whitespaces with underscores

    console.log(apiUrl);
    console.log("User Query:", searchBar.value); // log users search query
    localStorage.setItem("User Query", searchBar.value);
    console.log(localStorage);

    url = apiUrl; // set url to apiUrl
    recentSearch.push(searchBar.value);
    localStorage.setItem("results", JSON.stringify(recentSearch));
    searchResults(apiUrl);
  }
});

function generateList(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i].title); // lets see what wiki returns

    var searchResults = document.getElementById("searchResults");
    var resultsLi = document.createElement("li"); // create li element for all page titles

    resultsLi.className = "singleResult"; // add class to all li elements
    resultsLi.style.display = "none"; // hide li by default
    resultsLi.innerHTML = `<h3>
                       ${list[i].title}
                       </h3>
                        <p>
                      ${list[i].snippet}  <em>[click to read more...]</em>
                      </p>
                      `;

    searchResults.appendChild(resultsLi); // append lis to searchResults div

    // wrap li with corresponding wiki url
    $(resultsLi).wrap(function () {
      return (
        '<a target="_blank" href="https://en.wikipedia.org/wiki/' +
        list[i].title +
        '"></a>'
      );
    });

    // fade in for a nice UI touch
    $(resultsLi).fadeIn(1000);
  }
}

// snagged from the wiki api example page
function searchResults(url) {
  console.log(searchBar.value);

  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    list: "search",
    srsearch: searchBar.value,
    format: "json",
    srlimit: 5,
    prop: "images",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      generateList(response.query.search);
    })
    .catch(function (error) {
      console.log(error);
    });
}
