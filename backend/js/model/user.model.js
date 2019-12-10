var mongoose = require('mongoose');

// user model
var userSchema = mongoose.Schema({
    username: String,
    role: {type: String, enum: ['USER', 'DELIVERYMAN', 'MANAGER', 'ADMIN']},
    password: String,
    email: String,
    firstName: String,
    lastName: String,
    facebook: {
        id: String,
        token: String
    },
    google: {
        id: String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now()},
    // For users
    phone: String,
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
    // For managers
    income: Number,
    restaurants: [{type: mongoose.Schema.Types.ObjectId, ref: 'restaurants'}],
    // For DeliveryMan
    status: {type: String, enum: ['FREE', 'BUSY']},
    reviews: [String]
}, {collection: "FoodApp.users"});

module.exports = userSchema;
