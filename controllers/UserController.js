const BaseController = require('./BaseController');
const util = require('../util/awsUtil');

module.exports = class UserController extends BaseController {
    constructor(req, res, next) {
        super(req, res);
        this.req = req;
        this.res = res;
        this.next = next;
    }

    async createUser() {
        try {
            const result = await util.createUser(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in createUser of file UserController :: ', error);
            this.throwError(error);
        }
    }
    async login() {
        try {
            const result = await util.login(this.req);
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in login of file UserController :: ', error);
            this.throwError(error);
        }
    }
    async getSecrets() {
        try {
            const result = await util.getSecrets();
            this.sendResponse(result);
        } catch (error) {
            console.error('Error occured in getSecrtes of file UserController :: ', error);
            this.throwError(error);
        }
    }
}