const Joi = require('@hapi/joi');

const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .required()
    }

    return Joi.validate(data, schema);
}

module.exports.loginValidation = loginValidation;

const signupValidation = (data) => {
    const schema = {
        firstName: Joi.string()
            .required()
            .min(3),
        surName: Joi.string()
            .required()
            .min(3),
        email: Joi.string()
            .required()
            .email(),
        password: Joi.string()
            .min(7)
            .required()
            // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/),
        
    }

    return Joi.validate(data, schema);
}

module.exports.signupValidation = signupValidation;

const newScheduleValidation = (data) => {
    const schema = {
        dayWeek: Joi.string()
            .required(),
        startTime: Joi.string()
            .required(),
        endTime: Joi.string()
            .required()
    }

    return Joi.validate(data, schema);
}

module.exports.newScheduleValidation = newScheduleValidation;