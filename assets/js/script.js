var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
    document.getElementById()
    
}

function searchApi(query, format) {
    let locQueryUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=68a01bedfe0281ebdf08d0137195550e'
    if (format) {
        locQueryUrl = ''
    }
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
  
    var searchInputVal = document.querySelector('#search-input').value;
  
    if (!searchInputVal) {
      console.error('You need a search input value!');
      return;
    }
  
    searchApi(searchInputVal);
  }
  
  searchFormEl.addEventListener('submit', handleSearchFormSubmit);
  
  getParams();
  