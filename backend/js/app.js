module.exports = function (app) {
    //-------- Local DB Connection --------//
    // const mongoose = require('mongoose'); //created model loading here
    // // mongoose instance connection url connection
    // mongoose.connect('mongodb://localhost:27017/foods', {
    //     useMongoClient: true
    // });
    // mongoose.Promise = global.Promise;

    //-------- Remote DB Connection --------//
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    var username = "admin";
    var password = "admin";

    var connectionString = '';

    // get config vars from heroku
    if(process.env.MLAB_USERNAME_WEBDEV) {
        var username = process.env.MLAB_USERNAME_WEBDEV;
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        // mongoose config
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds241097.mlab.com:41097/heroku_h0qtslz5';
    }
    // connect to mlab mongodb
    mongoose.connect(connectionString);

    // get all routers.
    require("./route/user.route")(app);
    require("./route/yelp.route")(app);
    require("./route/order.route")(app);
    require("./route/review.route")(app);
};