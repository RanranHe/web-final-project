const mongoose = require('mongoose');
const reviewSchema = require('../model/review.model');

const reviewModel = mongoose.model('reviews', reviewSchema);

// create a review to restuaurant
exports.createReview = function (newReview) {
    return reviewModel.collection.insert(newReview);
};

// get reviews of a restaurant
exports.findReviewByRestaurant = function (restaurant) {
    return reviewModel.find({restaurant: restaurant});
};

// get the review by id
exports.findReviewById = function (reviewId) {
    return reviewModel.findById(reviewId);
};

// update the review details
exports.updateReview = function (id, newReview) {
    return reviewModel.update(
        {_id: id},
        {$set: newReview}
    );
};

// delete a review by removing a row in db.
exports.deleteReview = function (reviewId) {
    return reviewModel.remove({_id: reviewId});
};