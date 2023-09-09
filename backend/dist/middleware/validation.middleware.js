import { AppError } from "../utils/AppError.js";
export const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: true });
        return error ?
            next(new AppError(error.message, 400)) :
            next();
    };
};
