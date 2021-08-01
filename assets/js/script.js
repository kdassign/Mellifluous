

function getApi(requestUrl) {
    fetch(requestUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2e0b012657msh1714dee1b5287f7p134ef9jsn4822f3ef62df",
            "x-rapidapi-host": "genius.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(function(data) {
        
        for (let i=0; i<10; i++) {
            console.log(data.response.hits[i].result.full_title)
            var searchResult = data.response.hits[i].result.full_title
            var searchData = `<div style="border: solid 1px;">${searchResult}</div>`
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
    var requestUrl = `https://genius.p.rapidapi.com/search?q=${artistName}`;
    // console.log(getApi(requestUrl));
    // console.log(search);
    getApi(requestUrl);
    
    
})
