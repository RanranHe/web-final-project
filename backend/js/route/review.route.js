module.exports = function (app) {
    const reviewService = require('../controller/review.controller');

    // create review
    app.post("/api/project/review", reviewService.createReview);
    // get a restaurant's reviews
    app.get("/api/project/review/restaurant", reviewService.findReviewByRestaurant);
    // get review by id
    app.get("/api/project/review/:reviewId", reviewService.findReviewById);
    // update review details
    app.put("/api/project/review/:reviewId", reviewService.updateReview);
    // delete a review
    app.delete('/api/project/review/:reviewId', reviewService.deleteReview);
};