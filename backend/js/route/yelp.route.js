module.exports = function (app) {
    var yelpController = require('../controller/yelp.controller');

    // get restuarnts by location
    app.get("/api/yelp", yelpController.requestFood);
    // get the menu of a restuarnt
    app.get("/api/yelp/menu", yelpController.requestMenu);
    // get restuarnt by id
    app.get("/api/yelp/restaurant", yelpController.findRestaurantByKey);
};