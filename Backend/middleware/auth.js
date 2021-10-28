const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("toto", req.headers);
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const user_id = parseInt(req.body.userId);
        const userId = decodedToken.userId;
        console.log(userId);
        if (user_id && user_id !== userId) {
            console.log("toto");
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};