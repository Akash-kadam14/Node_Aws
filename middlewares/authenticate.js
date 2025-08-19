const jwt =  require('jsonwebtoken');
const HttpError = require('standard-http-error');
const { jwt_secret } = process.env;
const isAuthenticate = () => (req, res, next) => {
    try {
        const token = req.headers?.authorization;
        if(!token) throw new Error('token is required!');
        const decoded = jwt.verify(token, jwt_secret);
        if(!decoded)  throw new HttpError('401', 'Authentication failed');
        delete decoded.userAgent;
        req.authUser = decoded;
        return next();
    } catch (error) {
        error.code = error.code || 400
        return res.status(error.code).json({
            code: error.code,
            message: error.messsage,
            error: true,
        })
    }
}

module.exports = isAuthenticate;