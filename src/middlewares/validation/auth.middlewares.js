const Joi = require('joi');

class AuthMiddleware {
    constructor() {
        this.signupSchema = Joi.object()
            .options( { abortEarly: false })
            .keys({
                name: Joi.string().trim().required(),
                email: Joi.string().email().trim().required(),
                password: Joi.string().trim().min(4).required(),
                role: Joi.string().required()
            });

        this.signinSchema = Joi.object()
            .options( { abortEarly: false })
            .keys({                
                email: Joi.string().email().trim().required(),
                password: Joi.string().trim().min(4).required(),              
            });
    }

    signup = (req, res, next) => {
        const validationErrors = this.signupSchema.validate(req.body);
        
        if(validationErrors.error) {
            return res.status(400).json(this.mountErrorMessage(validationErrors.error.details));
        }

        next();
    }

    signin = (req, res, next) => {
        const validationErrors = this.signinSchema.validate(req.body);

        if(validationErrors.error) {            
            return res.status(400).json(this.mountErrorMessage(validationErrors.error.details));
        }

        next();
    }

    mountErrorMessage = errorsDetails => {
        const fieldErrors = errorsDetails.map(error => {
            return {
                field: error.context.label,
                message: error.message,
            }
        })

        const errorMessage = {
            message: 'Preenchimento incorreto. Por favor, verificar ',
            errors: fieldErrors,
        };

        return errorMessage;
    }
}

module.exports = new AuthMiddleware();