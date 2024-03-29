//API KEY: Jj5UaTZxJO2xNOMoaP3l24tTEnxOPuNG
/* 
API response info (the bits I need): 
JSON response includes 3 objects:
    "data" -- [list of objects] --
        "url" - gif url
        "rating" - gif rating
        "images" --
            "original_still" - original sized still
    "pagination" --
    "meta" -- "status" - should equal 200, "msg", "response_id"

*/

const apiKey = "Jj5UaTZxJO2xNOMoaP3l24tTEnxOPuNG";

const defaultTerms = ['cats', 'dogs', 'bunny', 'fox', 'skunk', 'deer', 'chinchilla', 'sugar glider', 'tapier', 'sloth', 'badger', 
    'snake', 'ermin', 'mink', 'wolf', 'cow'];

function buildAPICall (keyWord, offset, resultNum) {
    return `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${keyWord}&limit=${resultNum}&offset=${offset}&lang=en`;
};

function makeAPICall (keyword, offset=0, resultNum=10) {
    let requestURL = buildAPICall(keyword, offset, resultNum);
    console.log(requestURL);

    $.ajax({
        url: requestURL,
        method: "GET"
      }).then(function(response) {

        $('#gif-display').empty();

        for (let i = 0; i < response.data.length; i++) {
            let gifObj = response.data[i];
            let gifURL = gifObj.embed_url;
            let freezeFrame = gifObj.images.original_still.url;
            let gifRate = gifObj.rating;
            
            $('#gif-display').append(buildGif(gifURL, freezeFrame, gifRate));
        };
      });
};

function buildButton (term) {
    let btn = $('<button>').attr('class','btn btn-info m-1 gif-button');
    btn.attr('search-term', term);
    btn.html(term);

    return btn;
};

function buildGif (url, stillUrl, rating) {
    let gifBox = $('<div>').attr('class', 'gif-box');
    let image = $('<img>').attr('src', url);
    image.attr('class', 'gif-image');
    image.attr('still-url', stillUrl);
    image.attr('gif-url', url);
    gifBox.append($('<p>').html(`Rating: ${rating}`));
    gifBox.append(image);

    return gifBox;
};

// Initialize default buttons
$(document).ready(() => {
    for (let i=0; i < defaultTerms.length; i++) {
        $('#button-row').append(buildButton(defaultTerms[i]));
    };

    //Click handler for all buttons that should grab gifs
    $(document).on('click', '.gif-button', function() {
        console.log(`$(this) = ${$(this).attr('search-term')}`);
        $('#gif-display').append(buildGif(makeAPICall($(this).attr('search-term'))));
    });

});

