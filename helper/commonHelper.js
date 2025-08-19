const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { jwt_secret } = process.env;

async function jwtSign(user) {
    try {
        const userData = user;
        userData.userId = user._id;

        const token = jwt.sign(userData, jwt_secret, {
            expiresIn: '24h',
        });
        return token;
    } catch (error) {
        console.error('Error occured in getSecrtes of file UserController :: ', error);
        throw error;
    }
}

async function hash(password) {
    const salt = await bcrypt.gensalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    return hasedPassword;
}
async function comparePassword(password, hashedPassword) {
    const comparisonResult = await bcrypt.compare(password, hashedPassword);
    return comparisonResult;
}
module.exports = {
    jwtSign,
    hash,
    comparePassword
}