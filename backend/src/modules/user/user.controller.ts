import bcrypt from 'bcrypt'
import { getFromEnv } from '../../utils/getFromEnv.js'
import { generateToken } from '../../utils/generateToken.js'
import { UserModel } from '../../databases/models/user.model.js'
import { catchAsyncError } from '../../utils/catchAsyncError.js'
import { NextFunction, Request, Response } from 'express'
import { AppError } from '../../utils/AppError.js'

export const signUp = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;
    const { rounds } = getFromEnv()

    let user = await UserModel.findOne({ email })
    if (user) {
        console.log('sssssssss')
        return next(new AppError("Email Already exists", 400))
    } else {
        bcrypt.hash(password, rounds, async (err, hash) => {
            await UserModel.insertMany({ firstName, lastName, email, password: hash })

            res.json({ message: "success" })
        })
    }
})

export const signIn = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email })

    if (user) {
        const match = await bcrypt.compare(password, user.password ?? '')

        if (match) {
            const token = generateToken({ firstName: user.firstName, lastName: user.lastName, userId: user._id })
            res.json({ message: "success", name: `${user.firstName}  ${user.lastName}`, token })
        } else {
            res.json({ message: "Worng Password" })
        }
    } else {
        res.json({ message: "User Not Found." })
    }
})