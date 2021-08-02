

function getApi(requestUrl) {
    fetch(requestUrl, {
        "method": "GET",
        "headers": {
            'x-rapidapi-key': '8fddfbc6c0msh50cc1e17cb773bap17c7c1jsnad98cd7d5e6b',
            'x-rapidapi-host': 'genius.p.rapidapi.com'
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function(data) {
        
        for (let i=0; i<10; i++) {
            j = i+1
            console.log(data.response.hits[i].result.full_title)
            var searchResult = data.response.hits[i].result.full_title
            var searchData = `<div style="border: solid 1px;">${j} ${searchResult}</div>`
            $('.new-container').append(searchData)
        }
        
    })
    .catch(err => {
        console.error(err);
    });

}

$('#submit').click(function () {
    $('.new-container').empty();
    
    var artistName = $('.input').val();
    $('.new-container').append(`Top Searched for Songs for ${artistName}`)
    var requestUrl = `https://genius.p.rapidapi.com/search?q=${artistName}`;
    // console.log(getApi(requestUrl));
    // console.log(search);
    getApi(requestUrl);
    
    
})
