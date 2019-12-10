module.exports = function (app) {
    const orderController = require('../controller/order.controller');

    // POST create order
    app.post("/api/project/user/:userId/order", orderController.createOrder);
    // GET find a user's orders
    app.get("/api/project/user/:userId/order", orderController.findOrdersByUserId);
    // GET find a delivery man's orders
    app.get("/api/project/deliveryMan/:deliveryManId/order",orderController.findOrdersByDeliveryManId);
    // GET find an order by id
    app.get("/api/project/order/:orderId", orderController.findOrderById);
    
    // Do Edit-Order and Cancel-Order Here
    // PUT update order details
    app.put("/api/project/order/:orderId", orderController.updateOrder);
    // GET get all orders in the system
    app.get("/api/project/orders", orderController.getAllOrders);

};