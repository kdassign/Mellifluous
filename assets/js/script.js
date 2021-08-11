// variable declarations
var searchFormEl = document.querySelector('#search-form');
var lyricsBoxEl = document.querySelector('#lyrics-box')
var artworkEl = document.querySelector('#artwork-box')
var maxNum = 100000;
// event listener for search form submit
function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  
// error catch if user input null
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  // turns value into string
  var queryString = './searchresults.html?q=' + searchInputVal;

  location.assign(queryString);
}
// declaration of event listener
searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function searchApi() {
  var songNum = getRandomInt(maxNum);
  var locQueryUrl = `https://genius.p.rapidapi.com/songs/${songNum}`;

  
  // fetch query for genius API with parameters
  fetch(locQueryUrl, {
      "method": "GET",
      "headers": {
          'x-rapidapi-key': '8fddfbc6c0msh50cc1e17cb773bap17c7c1jsnad98cd7d5e6b',
          'x-rapidapi-host': 'genius.p.rapidapi.com'
      }
  })
      // turn response into JSON
      .then(response => {
          return response.json();
      })
      .then(function (data) {
        console.log(data.response.song.song_art_image_url)
        imageEl = document.createElement('img');
        imageEl.setAttribute('src', data.response.song.song_art_image_url)
        artworkEl.append(imageEl)
        
      })
      .catch(function (error) {
          searchApi();
          console.error(error);
          
      });

 
}

searchApi()