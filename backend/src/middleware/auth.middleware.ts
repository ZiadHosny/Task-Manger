import jwt, { JwtPayload } from "jsonwebtoken";
import { getFromEnv } from "../utils/getFromEnv.js";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { UserModel } from "../databases/models/user.model.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
import { AuthRequest } from "../utils/types.js";


export const userAuth = catchAsyncError(async (req: AuthRequest, res: Response, next: NextFunction) => {

    const { secretKey } = getFromEnv()
    // Read JWT from the 'jwt' cookie
    const token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey) as JwtPayload
            req.user = await UserModel.findById(decoded.userId).select('-password');
            next()
        }
        catch (err) {
            console.error(err);
            return next(new AppError('Not authorized, token failed', 401))
        }
    }
    else {
        return next(new AppError('Not authorized, no token', 401))
    }
})