var mongoose = require('mongoose');

// order model
var orderSchema = mongoose.Schema({
    _deliveryMan:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    _user: String,
    address: String,
    foods: [{restaurantName: String, items: [{name: String, price: Number, quantity: Number, singlePrice: Number}]}],
    creditCard: Number,
    creditCardHolder: String,
    creditCardExpireDate: String,
    name: String,
    totalPrice: Number,
    phone: String,
    date: {type: Date, default: Date.now()},
    status: {type: String, enum: ['Processing', 'Pickup', 'OnTheWay', 'Cancelled', 'Completed']}
}, {collection: "FoodApp.orders"});

module.exports = orderSchema;
