const {User} = require('./../models/user.js');

var authenticate = function(req, res, next) {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('Failed to verify token.');
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((error) => {
        res.status(401).send();
    });
};

module.exports = {authenticate: authenticate};