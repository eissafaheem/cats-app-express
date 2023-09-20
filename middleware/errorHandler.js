const STATUS_CODES = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case STATUS_CODES.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case STATUS_CODES.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case STATUS_CODES.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case STATUS_CODES.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        case STATUS_CODES.VALIDATION_ERROR:
            res.json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;

        default:
            res.json({
                title: "Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
    }
}

module.exports = errorHandler