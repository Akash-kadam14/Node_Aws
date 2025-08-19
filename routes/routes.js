const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuthorize = require('../middlewares/authorize');
const UserRole = require('../enumeration/UserRole');
const UserController = require('../controllers/UserController');

router.get('/getSecrets', isAuthorize([UserRole.SuperAdmin]),
async(req, res, next) => {
    const secrets = new UserController(req, res, next);
    secrets.getSecrets();
}
);

module.exports = router;