import jwt from "jsonwebtoken";
import { getFromEnv } from "../utils/getFromEnv.js";
import { AppError } from "../utils/AppError.js";
import { UserModel } from "../databases/models/user.model.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";
export const userAuth = catchAsyncError(async (req, res, next) => {
    const { secretKey } = getFromEnv();
    // Read JWT from the 'jwt' cookie
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = await UserModel.findById(decoded.userId).select('-password');
            next();
        }
        catch (err) {
            console.error(err);
            return next(new AppError('Not authorized, token failed', 401));
        }
    }
    else {
        return next(new AppError('Not authorized, no token', 401));
    }
});
