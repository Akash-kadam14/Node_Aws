module.exports = class BaseController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async sendResponse(result) {
        let data = {
            data: result,
        };

        if(data == null) {
            data = {};
        }

        const code = 200;
        data = {...data, code, error: false };
        return this.res.status(code).json(data);
    }

    async throwError(error) {
        let code = 400;
        let data = {};

        if(error!=null) {
            let message = error.messsage || error.statusMessage;
            if(error.code === 11000) {
                message = 'Email/Mobile/UserName already registered';
            }
            code = (error.code || error.statusMessage) ?  (error.code || error.statusMessage) : 400;
            data = { code, message };
            data.error = true;
        }
        return this.res.status(code >= 100 && code < 600 ? code : 500 ).json(data)
    }
}