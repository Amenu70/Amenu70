const productdb = require('../data/productdatabase');
const usersdb = require('../data/userdatabase');
const userCarts = [];
class Cart {
    constructor(userName) {
        this.userName = userName;
        this.myCart = { products: [], totalPrice: 0.00 };
    }

    // save a new userCart
    save() {
        userCarts.push(this);
        return userCarts;
    }

    //get all userCarts
    static getAllUserCarts() {
        return userCarts;
    }

    //get a user cart by userName
    static getByUserName(userName) {
        return userCarts.find(cart => cart.userName === userName)
    }

    // delete userCart by UserName
    static delteByUserName(userName) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            userCarts = userCarts.filter(cart => cart.userName !== userName)
        }
        return userCart;
    }

    // Add an item to a specific user cart
    static addProductForUser(userName, productId) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            const productStock = productdb.find(p => p.id == productId).stock;
            if (productStock <= 0) {
                return userCart.myCart;
            }

            // check whether the product is in a specific user cart or not
            const exsitingProductIndex = userCart.myCart.products.findIndex(prod => prod.id == productId);

            //if the product exists in the cart
            if (exsitingProductIndex > -1) {
                if (userCart.myCart.products[exsitingProductIndex].quantity < productStock) {
                    userCart.myCart.products[exsitingProductIndex].quantity += 1;
                    userCart.myCart.products[exsitingProductIndex].currentProductTotalPrice = (userCart.myCart.products[exsitingProductIndex].quantity * userCart.myCart.products[exsitingProductIndex].price).toFixed(2);
                }
                userCart.myCart.totalPrice = userCart.getTotalPriceForUser(userCart.userName);
                return userCart.myCart;
            }

            //if the product doesnt exist in the specific user cart
            else {
                const productInCart = productdb.find(prod => prod.id == productId);
                productInCart.quantity = 1;
                productInCart.currentProductTotalPrice = (productInCart.quantity * productInCart.price).toFixed(2);
                userCart.myCart.products.push(productInCart);
                userCart.myCart.totalPrice = userCart.getTotalPriceForUser(userCart.userName);
                return userCart.myCart;
            }
        }
        return;
    }

    // Remove an item from a specific user cart
    static removeProductForUser(userName, productId) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            const removedProduct = userCart.myCart.products.find(prod => prod.id == productId)
            if (removedProduct) {
                userCart.myCart.products = userCart.myCart.products.filter(prod => prod.id !== productId);
                userCart.myCart.totalPrice = userCart.getTotalPriceForUser(userCart.userName);
            }
            return removedProduct;
        }
        return;
    }

    // Update the quantity of an item in a specific user cart
    static updateQuantityForUser(userName, productId, newQuantity) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            userCart.myCart.products = userCart.myCart.products.map(prod => {
                if (prod.id === productId) {
                    const productStock = productdb.find(p => p.id == productId).stock;
                    if ((prod.quantity > 0 && prod.quantity < productStock) || (prod.quantity === productStock && newQuantity === -1)) {
                        prod.quantity += parseInt(newQuantity);
                        prod.currentProductTotalPrice = (prod.quantity * prod.price).toFixed(2);
                    }
                }
                return prod;
            });
            userCart.myCart.totalPrice = userCart.getTotalPriceForUser(userCart.userName);
            return userCart.myCart.products.find(prod => prod.id == productId);
        }
        return;
    }
    static placeOrderForUser(userName) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            userCart.myCart.products.forEach(element => {
                productdb.find(prod => prod.id === element.id).stock -= element.quantity;
            });
            userCart.myCart = { products: [], totalPrice: (0).toFixed(2) };
            return userCart.myCart;
        }
        return;
    }

    // Calculate the total price of a specific user cart
    getTotalPriceForUser(userName) {
        const userCart = userCarts.find(cart => cart.userName === userName)
        if (userCart) {
            return userCart.myCart.products.reduce((total, current) => total + current.price * current.quantity, 0.00).toFixed(2);
        }
    }
}

for (let i = 0; i < usersdb.length; i++){
    userCarts.push(new Cart(usersdb[i].userName))
}


module.exports = Cart;