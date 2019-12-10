module.exports = function (app) {
    var userController = require('../controller/user.controller');

    // For fb api and google api
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(userController.localStrategy));
    passport.serializeUser(userController.serializeUser);
    passport.deserializeUser(userController.deserializeUser);

    // search users by keyword
    app.get("/api/users/search/", userController.searchUsers);
    // user register
    app.post('/api/users/register', userController.register);
    // create a user
    app.post('/api/users/user', userController.createUser);
    // find a user by username
    app.get('/api/users/user/', userController.findUserByUsername);

    // for user login
    app.post("/api/users/login", passport.authenticate('local'), userController.login);
    // check whether the user is logged in
    app.get('/api/users/checkLoggedIn', userController.checkLoggedIn);

    // find user by id
    app.get('/api/users/user/:userId', userController.findUserById);
    // update user details
    app.put('/api/users/user/:userId', userController.updateUser);
    // delete a user
    app.delete('/api/users/user/:userId', userController.deleteUser);
    // for user logout
    app.post("/api/users/logout", userController.logout);
    // get all delivery man who are free
    app.get("/api/users/deliveryMan/free", userController.findFreeDeliveryMan);
    // get all users
    app.get("/api/users", userController.findAllUsers);

    // Facebook Login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#!/',
            failureRedirect: '/#!/login'
        }));
};