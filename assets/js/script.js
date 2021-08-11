// variable declarations
var searchFormEl = document.querySelector('#search-form');

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



