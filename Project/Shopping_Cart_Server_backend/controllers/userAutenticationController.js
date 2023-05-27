const User = require('../models/user');

exports.authentication = (req, res, next) => {
    const user = User.autenticateUser(req.body.email, req.body.password);
    if (user) {
        res.json({ accessToken: `${user.email}-${user.userName}-${Date.now().toString()}` })
    } else {
        res.json({ error: 'Invalid username and password!' });
    }
}