const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/', cartController.getAllUserCarts);
router.get('/:userName', cartController.getByUserName);
router.delete('/:userName', cartController.deleteByUserName);
router.post('/', cartController.createUserCart);

router.post('/:userName/', cartController.addProductForUser);
router.delete('/:userName/:productId', cartController.removeProductForUser);
router.put('/:userName/:productId', cartController.updateQuantityForUser)
router.get('/:userName/placeOrder', cartController.placeOrderForUser);

module.exports = router;