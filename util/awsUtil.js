const userModel = require('../model/userModel');
const commonHelper = require('../helper/commonHelper');
const {upload} = require('../helper/awsStorage');
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
                const fileName = eachFile.originalname;
                const title = fileName[0].split(' ').join('_');
                const generatedFileName = `Profile/${userId}_${title}_${fileName.at(-1)}`
                const awsFileUrl = await upload(eachFile, generatedFileName, USER_BUCKET_NAME)
                console.log('awsFileUrl', awsFileUrl);
            }
        }
        return { message: 'file uploaded successfully'}
    } catch (error) {
        console.error('Error occurred in uploadFileToS3 of file awsUtil :: ', error);
        throw error;
    }
}
module.exports = {
    getSecrets,
    login,
    createUser,
    uploadFileToS3
}