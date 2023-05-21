const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../products.html'));
});

router.post('/', (req, res) => {
    res.send('Product has been Posted');
});

module.exports = router;