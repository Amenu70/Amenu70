const Cart = require('../models/cart');

exports.createUserCart = (req, res) => {
    const addedUserCart = new Cart(req.body.userName).save()
    res.status(200).json(addedUserCart);
};
exports.getAllUserCarts = (req, res) => {
    res.status(200).json(Cart.getAllUserCarts());
};

exports.getByUserName = (req, res) => {
    const userName = req.params.userName;
    res.status(200).json(Cart.getByUserName(userName));
};
exports.getAllUserCarts = (req, res) => {
    res.status(200).json(Cart.getAllUserCarts());
};

exports.deleteByUserName= (req, res) => {
    const userName = req.params.userName;
    res.status(200).json(Cart.delteByUserName(userName));
};

exports.addProductForUser = (req, res) => {
    const userName = req.params.userName;
    const productId = req.body.productId;
    res.status(200).json(Cart.addProductForUser(userName,productId));
};

exports.removeProductForUser= (req, res) => {
    const { userName, productId } = req.params;
    res.status(200).json(Cart.removeProductForUser(userName, productId));
};

// Update the quantity of a product in the cart
exports.updateQuantityForUser=(req, res) => {
    const { userName, productId } = req.params;
    const newQuantity = req.body.quantity;
    res.status(200).json(Cart.updateQuantityForUser(userName,productId,newQuantity));
};

exports.placeOrderForUser = (req, res) => {
    const { userName, productId } = req.params;
    res.status(200).json(Cart.placeOrderForUser(userName, productId));
};
