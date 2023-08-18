class BaseController{
    sendError(status, validatorErrors, res){
        const {msg, path, value} = validatorErrors.errors.shift();
        res.status(status).json([{msg: msg}, {field: path, value: value}]);
        return;
    }
}

module.exports = BaseController;