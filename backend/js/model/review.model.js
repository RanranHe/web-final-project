var mongoose = require('mongoose');

// review model
var reviewSchema = mongoose.Schema({
    _user: String,
    restaurant: String,
    rate: {type: String, enum:['BAD', 'POOR','AVERAGE', 'GOOD', 'EXCELLENT']},
    text: String,
    url: String,
    size: String,
    dateCreated: {type: Date, default: Date.now()}
}, {collection: "FoodApp.reviews"});

module.exports = reviewSchema;
