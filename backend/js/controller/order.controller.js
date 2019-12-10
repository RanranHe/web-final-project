var orderService = require('../service/order.service');

// create an new order
exports.createOrder = function (req, res) {
    var userId = req.params.userId;
    var order = req.body;

    orderService
        .createOrder(userId, order)
        .then(
            function (order) {
                res.sendStatus(200);
            },
            function (err) {
            }
        );
};

// find all orders created by the user
exports.findOrdersByUserId = function (req, res) {
    orderService
        .findOrdersByUserId(req.params.userId)
        .then(function (orders) {
            res.json(orders);
        });
};

// get all orders delivered by the delivery man
exports.findOrdersByDeliveryManId = function (req, res) {
    orderService
        .findOrdersByDeliveryManId(req.params.deliveryManId)
        .then(function (orders) {
            res.json(orders);
        });
};

// find an order by ID
exports.findOrderById = function (req, res) {
    var orderId = req.params.orderId;
    orderService
        .findOrderById(orderId)
        .then(
            function (order) {
                res.json(order);
            },
            function (err) {
                res.send(null);
            }
        );
};

// update order details
exports.updateOrder = function (req, res) {
    var orderId = req.params['orderId'];
    var order = req.body;

    orderService
        .updateOrder(orderId, order)
        .then(function (response) {
            res.json(response);
        });
};

// get all orders in the system
exports.getAllOrders = function (req, res) {
    orderService.getAllOrders()
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.send(null);
        })
};
