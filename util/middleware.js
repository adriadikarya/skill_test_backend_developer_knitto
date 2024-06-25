const jwt = require('jsonwebtoken');

const jwtMiddleware = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];      
        jwt.verify(bearerToken, `${gConfig.jwt.secret}`, (err, data) => {
            if (err) {
                return res.status(403).json({
                    message: "Token mismatch!"
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(403).json({
            message: "Forbidden access!"
        });
    }
};

module.exports = {
    jwtMiddleware
};