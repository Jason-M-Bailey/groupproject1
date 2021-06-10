// Docs & References
// https://en.wikipedia.org/wiki/Lists_of_National_Basketball_Association_players
// https://www.mediawiki.org/wiki/API:Main_page

var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var query = searchBar.value;
var recentSearch = JSON.parse(localStorage.getItem("results")) || [];

pastSearchResults();

function pastSearchResults() {
  var defaultResults = document.getElementById("pastSearches");
  defaultResults.textContent = "";

  // for (let index = recentSearch.length - 1; index > recentSearch.length - 6; index--) { // this shows "undefined" when local storage does not have data 
    

  for (let index = recentSearch.length - 1; index >= 0; index--) {
    // while(defaultResults.firstChild) defaultResults.removeChild(defaultResults.firstChild);
    console.log(recentSearch[index]);

    var defaultLi = document.createElement("li");
    defaultLi.className = "singleResult";
    defaultLi.innerHTML = recentSearch[index];
    defaultLi.addEventListener("click", function () {
      searchResults(this.textContent);
      giphy(this.textContent); // changed function name from setup()
      document.querySelector("#searchResults").classList.remove("hide");
    });
    defaultResults.appendChild(defaultLi);
  }
}

var api = "";

// listen for click on submit button
submitBtn.addEventListener("click", function (e) {
  $("#searchResults").empty(); // clear search results
  e.preventDefault(); // prevent default behavior of submit button
  document.querySelector("#searchResults").classList.remove("hide"); // hide the element initially
  
  
  
  // if search bar is empty
  if (searchBar.value === "") {
    searchBar.classList.add("animated", "shake", "alert"); // add the alert class
    setTimeout(function () {
      searchBar.classList.remove("animated", "shake", "alert"); // remove alert after animation complete
    }, 750);
  } else {
    var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, "_") + "%27"; // replace whitespaces with underscores

    console.log(apiUrl);
    console.log("query:", searchBar.value); // log users search query
    localStorage.setItem("query", searchBar.value);
    
    console.log(localStorage);

    url = apiUrl; // set url to apiUrl

    // if recentSearch === searchBar.value
    if (!recentSearch.find((keyword) => keyword === searchBar.value)) {
      recentSearch.push(searchBar.value);
    }

    localStorage.setItem("results", JSON.stringify(recentSearch));
    searchResults(searchBar.value);
    giphy(userSearch.value); // this is the giphy onclick function
  }
  pastSearchResults();
});

function generateList(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i].title); // lets see what wiki returns

    var searchResults = document.getElementById("searchResults");
    var resultsLi = document.createElement("li"); // create li element for all page titles

    resultsLi.className = "singleResult"; // add class to all li elements
    resultsLi.style.display = "none"; // hide li by default
    resultsLi.innerHTML = `<a target="_blank" href="https://en.wikipedia.org/wiki/${list[i].title}">
    <h3>
                       ${list[i].title}
                       </h3>
                        <p>
                      ${list[i].snippet}  <em>[click to read more...]</em>
                      </p></a>
                      `;

    // wrap li with corresponding wiki url
    $(resultsLi).wrap(function () {
      return "";
    });
    $(resultsLi).fadeIn(1000); // fade in for a nice UI touch

    searchResults.innerHTML = resultsLi.innerHTML; // append lis to searchResults div
  }
}

// snagged from the wiki api example page
function searchResults(searchTerm) {
  console.log(searchBar.value);

  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    list: "search",
    srsearch: searchTerm + " nba", // added nba to improve search results
    format: "json",
    srlimit: 1,
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

//
// giphy
//
var gifOne = document.getElementById("gif-1");
var gifTwo = document.getElementById("gif-2");
var gifThree = document.getElementById("gif-3");
var userSearch = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");

let apiKey = "l638WPBsusN4Hth8cjVYu33qELrQ77E9"; // api key created for nba project

function giphy(searchTerm) {
  let api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=${searchTerm}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json.data[0].images.original.url); // this link displays just the gif
      console.log(json.data[3].images.original.url);
      gifOne.src = json.data[0].images.original.url;
      gifTwo.src = json.data[1].images.original.url; // uncomment if we want multiple gifs
      gifThree.src = json.data[2].images.original.url; // uncomment if we want multiple gifs
    })
    .catch((err) => console.log(err));
}
