import express from "express";
import { signInSchema, signUpSchema } from "./user.validation.js";
import { logoutUser, signIn, signUp } from "./user.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
const userRouter = express.Router();
userRouter.post('/signup', validation(signUpSchema), signUp);
userRouter.post('/login', validation(signInSchema), signIn);
userRouter.post('/logout', logoutUser);
export default userRouter;
