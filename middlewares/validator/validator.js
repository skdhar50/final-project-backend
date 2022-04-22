const { check, validationResult } = require('express-validator');

let validators = {}



validators.validationHandler = (req, res, next)=>{
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = validators;
