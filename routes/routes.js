const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuthorize = require('../middlewares/authorize');
const UserRole = require('../enumeration/UserRole');
const UserController = require('../controllers/UserController');
const validator = require('../middlewares/validateSchema');
const schema = require('../validator/schemas');
const isAuthenticated = require('../middlewares/authenticate');

const storage = multer.memoryStorage();
const upload = multer({storage});

router.post('/createUser', validator.bodyData(schema.createUser),
async(req, res, next) => {
    const user = new UserController(req, res, next);
    user.createUser();
});

router.post('/login', validator.bodyData(schema.login),
async(req, res, next) => {
    const user = new UserController(req, res, next);
    user.login();
});

router.get('/getSecrets',isAuthenticated, isAuthorize([UserRole.SuperAdmin]),
async(req, res, next) => {
    const secrets = new UserController(req, res, next);
    secrets.getSecrets();
});

router.post('/uploadFileToS3', upload.any(), isAuthenticated, isAuthorize([UserRole.NormalUser]),

async (req, res, next) => {
    const file = new UserController();
    file.uploadFileToS3();
}
)

module.exports = router;