const mongoose = require('mongoose');
const userSchema = require('../model/user.model');
// get data model
const userModel = mongoose.model('users', userSchema);

// create a new User by inserting data
exports.createUser = function (user) {
    return userModel.collection.insert(user);
};

// find user by the username and password
exports.findUserByCredentials = function (username, password) {
    return userModel.findOne({username: username, password: password});
};

// find user by the username
exports.findUserByUsername = function (username) {
    return userModel.findOne({username: username});
};

// search user by userId
exports.findUserById = function (userId) {
    return userModel.findById(userId);
};

// update user attributes
exports.updateUser = function (id, newUser) {
    return userModel.update(
        {_id: id},
        {$set: newUser}
    );
};

// delete user by removing a row from db
exports.deleteUser = function (userId) {
    return userModel.remove({_id: userId})
};

// for fb
exports.findUserByFacebookId = function (facebookId) {
    return userModel.findOne({'facebook.id': facebookId});
};

// for google
exports.findUserByGoogleId = function (googleId) {
    return userModel.findOne({'google.id': googleId});
};

// search User by a keyword
exports.searchUsers = function (searchText) {
    return userModel.find({username: {$regex: searchText + ""}});
};

// find deliverman who are free
exports.findFreeDeliveryMan = function () {
    return userModel.find({status: 'FREE'})
};

// get all users
exports.findAllUsers = function () {
    return userModel.find();
};

//////////////////Helper Functions////////////////////
// add an order into order list of the user
exports.addOrderToOrderArray = function (userId, orderId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.orders.push(orderId);
            return user.save();
        })
};

// add an order under a restaurant
exports.addOrderToRestaurantArray = function (userId, restaurantId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            user.restaurants.push(restaurantId);
            return user.save();
        })
};
