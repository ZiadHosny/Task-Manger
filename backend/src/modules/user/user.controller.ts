import { generateToken } from '../../utils/generateToken.js'
import { UserModel } from '../../databases/models/user.model.js'
import { catchAsyncError } from '../../utils/catchAsyncError.js'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../utils/AppError.js'

export const signUp = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await UserModel.findOne({ email })

    if (userExists) {
        return next(new AppError("User Already exists", 400))
    }

    const user = await UserModel.create({ firstName, lastName, email, password })

    if (user) {
        generateToken(res, user._id);

        res.status(201).json(user);
    } else {
        return next(new AppError("Invalid user data", 400))
    }
})

export const signIn = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }) as any

    if (user && await user.matchPassword(password)) {
        generateToken(res, user._id);
        res.json(user)
    } else {
        return next(new AppError('Invalid email or password', 401))
    }
})

export const logoutUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
})