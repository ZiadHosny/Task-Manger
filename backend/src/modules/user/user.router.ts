import express from "express";
import { signInSchema, signUpSchema } from "./user.validation.js";
import { signIn, signUp } from "./user.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";

const userRouter = express.Router();

userRouter.post('/signup', validation(signUpSchema), signUp)
userRouter.post('/login', validation(signInSchema), signIn)

export default userRouter;