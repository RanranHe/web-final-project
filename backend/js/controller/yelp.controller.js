var fetch = require('cross-fetch');

// get nearby restaurants by location
exports.requestFood = function (req, res) {
    var location = req.query["location"];

    var url = 'https://api.eatstreet.com/publicapi/v1/restaurant/search?street-address=' + location;
    fetch(url, {
        method: 'GET',
        headers: {
            'x-access-token': '62e9f3019c073369',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json()).then(data => res.send(data))
};

// get menu of a restaurant
exports.requestMenu = function (req, res) {
    var apiKey = req.query["apikey"];

    var url = "https://eatstreet.com/publicapi/v1/restaurant/" + apiKey + "/menu?includeCustomizations=false";
    fetch(url, {
        method: 'GET',
        headers: {
            'x-access-token': '62e9f3019c073369',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json()).then(data => res.send(data))
}
    
// get restaurant by apikey
exports.findRestaurantByKey = function (req, res) {
    var apiKey = req.query["apikey"];

    var url = "https://eatstreet.com/publicapi/v1/restaurant/" + apiKey;
    fetch(url, {
        method: 'GET',
        headers: {
            'x-access-token': '62e9f3019c073369',
            'Access-Control-Allow-Origin': '*'
        }
    }).then(response => response.json()).then(data => res.send(data))
}
