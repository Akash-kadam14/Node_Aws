const userModel = require('../model/userModel');
const commonHelper = require('../helper/commonHelper');
const { USER_BUCKET_NAME } = process.env;
async function createUser(req) {
 try {
    const reqBody = req.body;
    reqBody.password = await commonHelper.hash(reqBody.password);
    const data = await userModel.create(reqBody);
    return { message: 'User created successfully!', data}
 } catch (error) {
    console.error('Error occurred in createUser of file awsUtil :: ', error);
    throw error;
 }
}

async function login(req) {
    try {
        const { email, password } = req.body;
        const getUser = await userModel.findOne({ email }).lean();
        const validatePassword = await commonHelper.comparePassword(password, getUser.password);
        if(!validatePassword) throw new Error('Invalid Password');
        const token = await commonHelper.jwtSign(getUser);
        return token;
    } catch (error) {
        console.error('Error occurred in login of file awsUtil :: ', error);
        throw error; 
    }
}

async function getSecrets() {
    try {
        return process.env;
    } catch (error) {
        console.error('Error occurred in getScrets of file awsUtil :: ', error);
        throw error;
    }
}

async function uploadFileToS3(req) {
    try {
        const { userId } = req.authUser;
        if(req.files && req.files.length > 0) {
            for (eachFile of req.files) {
                
            }
        }
    } catch (error) {
        console.error('Error occurred in getScrets of file awsUtil :: ', error);
        throw error;
    }
}
module.exports = {
    getSecrets,
    login,
    createUser,
}