var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
    // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
    var searchParamsArr = document.location.search.split('&');
    console.log(searchParamsArr)
    // Get the query and format values
    var query = searchParamsArr[0].split('=').pop();
    console.log(query)
    
    var format = searchParamsArr[1].split('=').pop();
    searchApi(query, format);
}

function searchGifApi() {
    var apiKey = 'ICl9v7ZZJJN5ViF4ldRueAOfM2Q8vABA';
    
}

function printResults(resultObj, giphyObj) {
    

    // set up `<div>` to hold result content
    var resultCard = document.createElement('div');
    resultCard.classList.add('box');

    var resultBody = document.createElement('div');
    resultBody.classList.add('content');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.full_title;

    var bodyContentEl = document.createElement('p');
    bodyContentEl.innerHTML =
        '<strong>URL:</strong> ' + resultObj.url + '<br/>';

    var gifEl = document.createElement('div');
    gifEl.setAttribute('style', 'text-align: center; margin: 20px; border: solid 2px; border-radius: 10px;')
    gifEl.innerHTML = 'The song gif goes here';

    var linkButtonEl = document.createElement('a');
    linkButtonEl.textContent = 'Visit URL';
    linkButtonEl.setAttribute('href', resultObj.url);
    linkButtonEl.classList.add('btn', 'btn-dark');

    resultBody.append(titleEl, bodyContentEl, gifEl, linkButtonEl);

    resultContentEl.append(resultCard);
}



function searchApi(query, format) {

    var locQueryUrl = `https://genius.p.rapidapi.com/search?q=${query}`;
   


    fetch(locQueryUrl, {
        "method": "GET",
        "headers": {
            'x-rapidapi-key': '8fddfbc6c0msh50cc1e17cb773bap17c7c1jsnad98cd7d5e6b',
            'x-rapidapi-host': 'genius.p.rapidapi.com'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(function (data) {
            // Write the most likely result for the song or artist that 
            // the user is trying to search for. If a song is being searched for,
            // the artist name appears here. If an artist is begin searched for,
            // then the artist name will appear here.
            resultTextEl.textContent = data.response.hits[0].result.primary_artist.name;

            if (!data.response.hits.length) {
                console.log('No results found!');
                resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
            } else {
                resultContentEl.textContent = '';
                for (var i = 0; i < data.response.hits.length; i++) {
                    printResults(data.response.hits[i].result);
                }
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;
    var formatInputVal = document.querySelector('#format-input').value;

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    searchApi(searchInputVal, formatInputVal);
}




searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();

