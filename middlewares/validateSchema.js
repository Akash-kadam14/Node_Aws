const queryData = (schema) => (req, res, next)=> {
    const reqQuery = req.query;
    const { error } = schema.validate(reqQuery);
    if( error == null ) return next();
    return res.status(400).json({ code: 400, error: error.msessage, error: true})
}
const bodyData = (schema) => (req, res, next)=> {
    const reqBody = req.body;
    const { error } = schema.validate(reqBody);
    if( error == null ) return next();
    return res.status(400).json({ code: 400, message: error.message, error: true})
}
module.exports = {
    queryData,
    bodyData,
}