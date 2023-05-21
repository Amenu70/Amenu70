const express = require('express');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'../users.html'))
});


router.post('/', (req, res) => {
    res.send('POST request received for User');
});

module.exports = router;
