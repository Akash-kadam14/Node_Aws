const HttpError = require('standard-http-error');
const isAuthorize = (assignedRole) => (req, res, next)=> {
    try {
        const { role } = req.authUser;
        if(!assignedRole.includes(role)) {
            throw new HttpError(401, 'Unauthorized')
        }
        return next();
    } catch (error) {
        error.code = error.code || 400
        return res.status(error.code).json({
            code: error.code,
            message: error.message,
            error: true,
        })
    }

}

module.exports = isAuthorize;