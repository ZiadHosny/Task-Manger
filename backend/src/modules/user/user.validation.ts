import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})