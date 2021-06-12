// Docs & References
// https://en.wikipedia.org/wiki/Lists_of_National_Basketball_Association_players
// https://www.mediawiki.org/wiki/API:Main_page
// add giphy api docs
// add ball don't lie docs

var searchBar = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");
var query = searchBar.value;
var recentSearch = JSON.parse(localStorage.getItem("results")) || [];

// ball don't lie api vars
var playerName = document.getElementById("player-name");
var points = document.getElementById("ppg");
var rebounds = document.getElementById("rpg");
var assists = document.getElementById("apg");
var fieldGoal = document.getElementById("fg");
var threes = document.getElementById("fg3p");
var freeThrows = document.getElementById("ft");
var gamesPlayed = document.getElementById("gp");
var minutes = document.getElementById("mpg");

pastSearchResults();

// 
// store and display past search results on page
// 
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
      giphy(this.textContent);
      document.querySelector("#searchResults").classList.remove("hide");
    });
    defaultResults.appendChild(defaultLi);
  }
}

var api = "";

// listen for click on submit button
submitBtn.addEventListener("click", function (e) {
  $("#searchResults").empty(); 
  e.preventDefault(); 
  document.querySelector("#searchResults").classList.remove("hide"); 

  // if search bar is empty
  if (searchBar.value === "") {
    searchBar.classList.add("animated", "shake", "alert");
    setTimeout(function () {
      searchBar.classList.remove("animated", "shake", "alert");
    }, 750);
  } else {
    var apiUrl = api + "%27" + searchBar.value.replace(/[\s]/g, "_") + "%27";

    console.log(apiUrl);
    console.log("query:", searchBar.value);
    localStorage.setItem("query", searchBar.value);
    console.log(localStorage);
    url = apiUrl;

    if (!recentSearch.find((keyword) => keyword === searchBar.value)) {
      recentSearch.push(searchBar.value);
    }

    localStorage.setItem("results", JSON.stringify(recentSearch));
    searchResults(searchBar.value);
    giphy(userSearch.value);
  }
  pastSearchResults();
  playerSearch();
});

// 
// create wiki results
// 
function generateList(list) {
  for (let i = 0; i < list.length; i++) {
    console.log(list[i].title);

    var searchResults = document.getElementById("searchResults");
    var resultsLi = document.createElement("li");

    resultsLi.className = "singleResult"; 
    resultsLi.style.display = "none";
    resultsLi.innerHTML = `<a target="_blank" href="https://en.wikipedia.org/wiki/${list[i].title}">
    <h3>
                       ${list[i].title}
                       </h3>
                        <p>
                      ${list[i].snippet}  <em>[click to read more...]</em>
                      </p></a>
                      `;

    $(resultsLi).wrap(function () {
      return "";
    });
    $(resultsLi).fadeIn(1000);

    searchResults.innerHTML = resultsLi.innerHTML; 
  }
}

//
// wiki api
//
function searchResults(searchTerm) {
  console.log(searchBar.value);

  var url = "https://en.wikipedia.org/w/api.php";

  var params = {
    action: "query",
    list: "search",
    srsearch: searchTerm + " nba",
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
// giphy api
//
var gifOne = document.getElementById("gif-1");
var gifTwo = document.getElementById("gif-2");
var gifThree = document.getElementById("gif-3");
var userSearch = document.getElementById("searchBar");
var submitBtn = document.getElementById("submitBtn");

let apiKey = "l638WPBsusN4Hth8cjVYu33qELrQ77E9";

function giphy(searchTerm) {
  let api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=${searchTerm}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      console.log(json.data[0].images.original.url);
      console.log(json.data[3].images.original.url);
      gifOne.src = json.data[0].images.original.url;
      gifTwo.src = json.data[1].images.original.url;
      gifThree.src = json.data[2].images.original.url;
    })
    .catch((err) => console.log(err));
}

//
// ball don't like api
//
function playerSearch() {
  var playerApi =
    "https://www.balldontlie.io/api/v1/players?search=" + userSearch.value;
  fetch(playerApi)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      var playerID = json.data[0].id;
      playerName.innerText =
        json.data[0].first_name +
        " " +
        json.data[0].last_name +
        " | " +
        json.data[0].team.abbreviation +
        " | 2020-2021 Stats";
      var statsApi =
        "https://www.balldontlie.io/api/v1/season_averages?api/v1/season_averages?season=2020&player_ids[]=" +
        playerID;
      fetch(statsApi)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json);
          points.innerText = json.data[0].pts;
          rebounds.innerText = json.data[0].reb;
          assists.innerText = json.data[0].ast;
          fieldGoal.innerText = json.data[0].fg_pct;
          threes.innerText = json.data[0].fg3_pct;
          freeThrows.innerText = json.data[0].ft_pct;
          gamesPlayed.innerText = json.data[0].games_played;
          minutes.innerText = json.data[0].min;
        });
    });
}
