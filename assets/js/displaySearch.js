var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var pastSearchButtonEl = document.querySelector('#past-search-buttons');

var pastSearches = [];
var gifArray = [];
var urlArray = [];

// The getParams() function gets the users input from the index.html page.
// The getParams() function serves as an init() function.
function getParams() {
    // Get the search params out of the URL, namely the search query
    var searchParamsArr = document.location.search.split('&');
    // Get the query and remove the 'q='
    var query = searchParamsArr[0].split('=').pop();
    searchApi(query);
}

// request sent for giphy API with rapid API key generated. uses the same search parameters as the initial search bar
function searchGifApi(searchItem, num) {
    var apiKey = 'ICl9v7ZZJJN5ViF4ldRueAOfM2Q8vABA';
    var contentRating = 'g';

    var requestUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchItem}&&limit=10&rating=${contentRating}`;
    fetch(requestUrl)
        .then(response => { return response.json(); })
        .then(data => {
            for (let i = 0; i < num; i++) {
                gifArray.push(data.data[i].embed_url)
                urlArray.push(data.data[i].url)
                
            }

        })
        .catch(function (error) {
            console.error(error);
        });

}

// creates divs to add content in card format based on search query
function printResults(resultObj, gifObj) {


    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('box');

    var resultBody = document.createElement('div');
    resultBody.classList.add('content');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.full_title;

    // div created for giphy .gif
    var gifEl = document.createElement('div');
    gifEl.setAttribute('style', 'margin: 20px;');
    gifEl.setAttribute('class', 'gif');
    gifEl.innerHTML = `<iframe src="${gifObj}" allowFullScreen></iframe><p><a href="https://giphy.com">via GIPHY</a></p>`;

    // link to genius URL with lyrics for search query
    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Click for Lyrics!';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    // append to current elements on page
    resultBody.append(titleEl, gifEl, linkButtonEl);

    resultContentEl.append(resultCard);
}


// API request to genius for lyrics, song title, or artist
function searchApi(query) {

    var locQueryUrl = `https://genius.p.rapidapi.com/search?q=${query}`;

    searchGifApi(query, 10);
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
            // Write the most likely result for the song or artist that 
            // the user is trying to search for. If a song is being searched for,
            // the artist name appears here. If an artist is begin searched for,
            // then the artist name will appear here.
            resultTextEl.textContent = data.response.hits[0].result.primary_artist.name;
            
            // if promise returns null, return nothing. if not, display results
            pastSearch(data.response.hits[0].result.primary_artist.name)

            if (!data.response.hits.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < data.response.hits.length; i++) {

                    printResults(data.response.hits[i].result, gifArray[i]);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
    gifArray = [];
    urlArray = [];
   
}

// submit event listener
function handleSearchFormSubmit(event) {
    event.preventDefault();


    var searchInputVal = document.querySelector('#search-input').value;


    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    searchApi(searchInputVal);
    
}

// This creates the past search elements on the page by creating a div
// element and styling each element. The function then appends the div
// the the parent element.
function pastSearch(query) {
    var pastSearchParentEl = document.getElementById('past-search-buttons');
    var pastSearchEl = document.createElement('div');
    pastSearchEl.textContent = query;
    pastSearchEl.setAttribute('style', 'padding: 5px; margin: 5px;');
    pastSearchEl.setAttribute('past-search', query);
    pastSearchEl.setAttribute('type', 'submit');
    pastSearches.push(query);
    pastSearchParentEl.append(pastSearchEl);
}

// This is the handler that is passed to the event listener for
// the past search elements. The user can click on a past search
// and obtain the results.
function pastSearchHandler(event) {
    var query = event.target.getAttribute('past-search');
    if (query) {
        searchApi(query);
    }
}

// stores search queries locally so you can see what you have searched for
function saveSearch() {
    localStorage.setItem('pastSearches', JSON.stringify())
}


// initiate on submit
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
pastSearchButtonEl.addEventListener('click', pastSearchHandler);

getParams();





