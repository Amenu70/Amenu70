const express = require('express');
const userAuthenticationController = require('../controllers/userAutenticationController');

const router = express.Router();

router.post('/', userAuthenticationController.authentication);
router.use((req, res, next) => {
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1]
    if (token === 'null') {
        res.json({ error: 'No Access Token' });
    } else {
        req.user = token.split('-')[0];
        next();
    }
})

module.exports = router;