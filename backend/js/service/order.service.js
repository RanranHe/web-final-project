const mongoose = require('mongoose');
const orderSchema = require('../model/order.model');

const orderService = mongoose.model('orders', orderSchema);
const userService = require('./user.service');

// create a order
exports.createOrder = function (userId, order) {
    order._user = userId;
    return orderService
        .collection.insert(order)
        .then(function (order) {
            var userId = order._user;
            var orderId = order._id;
            userService.addOrderToOrderArray(userId, orderId);
        })
};

// update order details
exports.updateOrder = function (orderId, order) {
    return orderService.update(
        {_id: orderId},
        {$set: order});
};

// get a user's orders
exports.findOrdersByUserId = function (userId) {
    return orderService.find({_user: userId});
};

// get a deliverman's orders
exports.findOrdersByDeliveryManId = function (deliveryManId) {
    return orderService.find({_deliveryMan: deliveryManId});
};

// find typical orders by id
exports.findOrderById = function (orderId) {
    return orderService.findOne({_id: orderId});
};

// get all orders in the system
exports.getAllOrders = function () {
    console.log("model: " + orderService.find({_id: /1/}))
    return orderService.find();
};

