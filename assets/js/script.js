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
        imageEl = document.createElement('img');
        imageUrlEl = document.createElement('a');
        songTitleEl = document.createElement('h1');
        songTitleEl.setAttribute('style', 'font-size: 30px;')
        songTitleEl.textContent = data.response.song.full_title
        imageEl.setAttribute('src', data.response.song.song_art_image_url);
        imageUrlEl.setAttribute('href', data.response.song.url);
        artworkEl.append(songTitleEl)
        artworkEl.append(imageUrlEl);
        imageUrlEl.append(imageEl);
        
        
      })
      .catch(function (error) {
          searchApi();
          console.error(error);
          
      });

 
}

searchApi()


let img = new Image();
img.src = './assets/animated-staff-transparent.png';
img.onload = function () {
    init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

var x1 = [3, 786, 4, 786, 4, 785, 5, 786, 6, 786, 9, 790, 12, 794];
var y1 = [7, 9, 105, 107, 195, 194, 283, 278, 363, 356, 446, 443, 527, 527];
var x2 = [766, 1549, 767, 1549, 767, 1548, 768, 1549, 769, 1549, 772, 1553, 775, 1557];
var y2 = [63, 65, 161, 163, 251, 250, 338, 331, 419, 412, 502, 499, 583, 583];
var widthArray = [800, 1600, 800, 1600, 800, 1600, 800, 1600, 800, 1600, 800, 1600, 800, 1600];
var heightArray = [50, 50, 100, 100, 200, 200, 300, 300, 400, 400, 500, 500, 600, 600];
let frameCount = 0;
let currentLoopIndex = 0;

function step() {
    frameCount++;
    if (frameCount < 15) {
        window.requestAnimationFrame(step);
        return;
    }
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x1[currentLoopIndex], y1[currentLoopIndex], x2[currentLoopIndex], y2[currentLoopIndex], 0, 0, widthArray[currentLoopIndex], heightArray[currentLoopIndex]);
    currentLoopIndex++;
    if (currentLoopIndex >= x1.length) {
        currentLoopIndex = 0;
    }
    window.requestAnimationFrame(step);
}

function init() {
    window.requestAnimationFrame(step);
    // ctx.drawImage(img, 0, 0, 49, 49, 0, 0, 800, 600)
    // ctx.drawImage(img, 51, 0, 100, 49, 0, 0, 1600, 600)
    // ctx.drawImage(img, 0, 51, 49, 100, 0, 0, 800, 1200)
    // ctx.drawImage(img, 51, 51, 100, 100, 0, 0, 1600, 1200)
}