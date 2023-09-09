import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { AppError } from "../utils/AppError.js"

export const validation = (schema: Joi.ObjectSchema) => {

    return (req: Request, res: Response, next: NextFunction) => {

        const { error } = schema.validate(req.body, { abortEarly: true })

        return error ?
            next(new AppError(error.message, 400)) :
            next()
    }
}