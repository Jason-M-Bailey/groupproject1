var gifOne = document.getElementById("gif-1");
var gifTwo = document.getElementById("gif-2")
var gifThree = document.getElementById("gif-3")
var userSearch = document.getElementById("search-bar");
var submitBtn = document.getElementById("submit-button");

let apiKey= "l638WPBsusN4Hth8cjVYu33qELrQ77E9" // api key created for nba project

// https://api.giphy.com/v1/gifs/search?api_key=l638WPBsusN4Hth8cjVYu33qELrQ77E9&q=&limit=1&offset=0&rating=g&lang=en


// $( document ).ready(function() {
//   console.log(userSearch.value);
// });

function setup(){
  let api = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=5&q=${userSearch.value}`;
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
      .catch(err => console.log(err));
}
    

submitBtn.addEventListener("click", function (e) {
  e.preventDefault(); // prevent default behavior of submit button
  setup();
  console.log(userSearch.value); 
});


}
