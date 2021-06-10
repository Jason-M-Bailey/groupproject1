var gifOne = document.getElementById("gif-1");
var gifTwo = document.getElementById("gif-2")
var gifThree = document.getElementById("gif-3")
var userSearch = document.getElementById("search-bar");
var submitBtn = document.getElementById("submit-button");

var playerName = document.getElementById("name");
var points = document.getElementById("ppg");
var rebounds = document.getElementById("rpg");
var assists = document.getElementById("apg");
var fieldGoal = document.getElementById("fg");
var threes = document.getElementById("fg3p");
var freeThrows = document.getElementById("ft");
var gamesPlayed = document.getElementById("gp");
var minutes = document.getElementById("mpg");

let apiKey= "l638WPBsusN4Hth8cjVYu33qELrQ77E9" // api key created for nba project

// https://api.giphy.com/v1/gifs/search?api_key=l638WPBsusN4Hth8cjVYu33qELrQ77E9&q=&limit=1&offset=0&rating=g&lang=en


// $( document ).ready(function() {
//   console.log(userSearch.value);
// });

// function setup(){
//   let api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=` + userSearch.value;
//   fetch(api)
//   .then(response => {
//         return response.json();
//       })
//       .then(json => {
//         console.log(json)
//         console.log(json.data[0].images.original.url); // this link displays just the gif
//         console.log(json.data[3].images.original.url);
//         gifOne.src= json.data[0].images.original.url;
//         gifTwo.src= json.data[1].images.original.url;
//         gifThree.src= json.data[2].images.original.url;

        

//       })
//       .catch(err => console.log(err));
// }

function playerSearch(){
  var playerApi= 'https://www.balldontlie.io/api/v1/players?search='+ userSearch.value;
  fetch(playerApi)
  .then(response => {
    return response.json();
  })
  .then(json => {
    console.log(json);
    var playerID= json.data[0].id;
    playerName.innerText= json.data[0].first_name + " " + json.data[0].last_name +" |" + json.data[0].team.abbreviation + "| 2020-2021 Stats";
    var statsApi= 'https://www.balldontlie.io/api/v1/season_averages?api/v1/season_averages?season=2020&player_ids[]='+ playerID
    fetch(statsApi)
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log(json);
      points.innerText = "PPG: " + json.data[0].pts;
      rebounds.innerText= "RPG: " + json.data[0].reb;
      assists.innerText= "APG: " + json.data[0].ast;
      fieldGoal.innerText= "FG%: " + json.data[0].fg_pct;
      threes.innerText= "3FG%: " + json.data[0].fg3_pct;
      freeThrows.innerText="FT%: " + json.data[0].ft_pct;
      gamesPlayed.innerText= "GP: " + json.data[0].games_played;
      minutes.innerText= "MPG: " + json.data[0].min;  
    })
    var api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=` + json.data[0].first_name + " "+ json.data[0].last_name;
    fetch(api)
    .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json)
          console.log(json.data[0].images.original.url); // this link displays just the gif
          console.log(json.data[3].images.original.url);
          gifOne.src= json.data[0].images.original.url;
          gifTwo.src= json.data[1].images.original.url;
          gifThree.src= json.data[2].images.original.url;
  
          
  
        })
    
    
  })

  

}




    

submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent default behavior of submit button
  // setup();
  playerSearch();
  console.log(userSearch.value);
   
});