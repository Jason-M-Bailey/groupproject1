// Docs & References
// https://en.wikipedia.org/wiki/Lists_of_National_Basketball_Association_players
// https://www.mediawiki.org/wiki/API:Main_page

var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var query = searchBar.value;
var recentSearch = JSON.parse(localStorage.getItem("results")) || [];

var gif= document.getElementsByClassName("gif-container");
$(gif).fadeIn(1000);

// keep recent search display as 5 results
// if statement to determine if anything in recent search
//Recent Search Function

function updateRecentSearch () {
  var defaultResults = document.getElementById("defaultSearches");
  //defaultResults.style.listStyle("None");
  //var ul = document.getElementById("ulMessages");
  while(defaultResults.firstChild) defaultResults.removeChild(defaultResults.firstChild);

  for (let index = recentSearch.length - 1; index > recentSearch.length - 6; index--) {
  console.log(recentSearch[index]);


  //var defaultResults = document.getElementById("defaultSearches");
  var defaultLi = document.createElement("li");
  
  defaultLi.className = "singleResult";
  defaultLi.innerHTML = recentSearch[index];

  defaultResults.appendChild(defaultLi);
  // location.reload(); // uncomment this when you use onclick
}}

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
    console.log("query:", searchBar.value); // log users search query
    localStorage.setItem("query", searchBar.value);
    
    console.log(localStorage);
    
    url = apiUrl; // set url to apiUrl
    recentSearch.push(searchBar.value);
    localStorage.setItem("results", JSON.stringify(recentSearch));
    searchResults(apiUrl);
    setup();
  }
  updateRecentSearch ();
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
    srsearch: searchBar.value + " nba",
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

// https://api.giphy.com/v1/gifs/search?api_key=l638WPBsusN4Hth8cjVYu33qELrQ77E9&q=&limit=1&offset=0&rating=g&lang=en

// $( document ).ready(function() {
//   console.log(userSearch.value);
// });

function setup() {
  let api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=${userSearch.value}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json.data[0].images.original.url); // this link displays just the gif
      console.log(json.data[3].images.original.url);
      gifOne.src = json.data[0].images.original.url;
      // gifTwo.src = json.data[1].images.original.url;
      // gifThree.src = json.data[2].images.original.url;
    })
    .catch((err) => console.log(err));
}

// submitBtn.addEventListener("click", function (e) {
//   e.preventDefault(); // prevent default behavior of submit button
//   setup();
//   console.log(userSearch.value);
//   // fade in over 1 second 
//   // wiki code = $(resultsLi).fadeIn(1000);
//   gifOne.fadeIn(1000);
// });


