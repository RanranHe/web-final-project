var reviewModel = require('../service/review.service');

// create a new review for the restaurant
exports.createReview = function (req, res) {
    var review = req.body;
    reviewModel
        .createReview(review)
        .then(
            function (review) {
                res.sendStatus(200);
            },
            function (err) {
            });
};

// get all reviews of a restuarnts
exports.findReviewByRestaurant = function (req, res) {
    var restaurantName = req.query['restaurant'];
    reviewModel
        .findReviewByRestaurant(restaurantName)
        .then(function (review) {
            res.json(review);
        }, function (err) {
            res.send(null);
        });
};

// find a review by id
exports.findReviewById = function (req, res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .findReviewById(reviewId)
        .then(
            function (review) {
                res.json(review);
            },
            function (err) {
                res.send(null);
                // res.status(400).send(err);
            }
        );
};

// update review details
exports.updateReview = function (req, res) {
    var reviewId = req.params['reviewId'];
    var review = req.body;

    reviewModel
        .updateReview(reviewId, review)
        .then(function (response) {
            res.json(response);
        });
};

// delete a review
exports.deleteReview = function (req, res) {
    var reviewId = req.params.reviewId;
    reviewModel
        .deleteReview(reviewId)
        .then(function (status) {
                res.json(200);
            },
            function (err) {
                res.status(404).send(err);
            });
};
