var userService = require('../service/user.service');

// Register
var bcrypt = require("bcrypt-nodejs");

//////////////// Register ////////////////
exports.register = function (req, res) {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userService
        .createUser(user)
        .then(function (user) {
            req.login(user.ops[0], function (status) {
                res.json(user);
            });
        });
};

// get the user by its username
exports.findUserByUsername = function (req, res) {
    const username = req.query['username'];
    userService
        .findUserByUsername(username)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            // res.status(400).send(err);
            res.send(null);
        });
};

// create a new user
exports.createUser = function (req, res) {
    const user = req.body;
    userService
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
};

/////////////// Login ///////////////
exports.localStrategy = function (username, password, done) {
    userService
        .findUserByUsername(username)
        .then(function (user) {
            if (user && bcrypt.compareSync(password, user.password)) {
                done(null, user);
            } else {
                done(null, false);
            }
        }, function (error) {
            done(error, false);
        })
};

// login
exports.login = function (req, res) {
    var user = req.user;
    res.json(user);
};

// check whether it's logged in
exports.checkLoggedIn = function (req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
};

exports.serializeUser = function (user, done) {
    done(null, user);
};

// deserialize User
exports.deserializeUser = function (user, done) {
    userService
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
};
////////////////////////////////////////
// find the user by its id
exports.findUserById = function (req, res) {
    var userId = req.params['userId'];

    userService
        .findUserById(userId)
        .then(function (user) {
            res.json(user)
        }, function (err) {
            res.send(err)
        })
};

// update user details
exports.updateUser = function (req, res) {
    var id = req.body.id;
    var newUser = req.body.newUser;
    userService
        .updateUser(id, newUser)
        .then(function (user) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to update User")
            });
};

// delete user
exports.deleteUser = function (req, res) {
    var id = req.params.userId;
    userService
        .deleteUser(id)
        .then(function (status) {
                res.sendStatus(200);
            },
            function (err) {
                res.status(404).send("Unable to remove user");
            });
};

// for user logout
exports.logout = function (req, res) {
    req.logout();
    res.sendStatus(200);
};

// search user by keword
exports.searchUsers = function (req, res) {
    var searchText = req.query['searchText'];
    userService
        .searchUsers(searchText)
        .then(function (users) {
            res.json(users);
        }, function (err) {
            res.send(null);
        });
};

// get all delivery man who are free
exports.findFreeDeliveryMan = function (req, res) {
    userService.findFreeDeliveryMan()
        .then(function (response) {
            res.json(response)
        }, function (err) {
            res.send(err)
        })
};

// get all users in the system
exports.findAllUsers = function (req, res) {
    userService.findAllUsers()
        .then(function (response) {
            res.json(response)
        }, function (err) {
            res.send(err)
        })
};
