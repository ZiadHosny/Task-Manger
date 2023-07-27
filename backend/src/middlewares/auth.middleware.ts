import jwt from "jsonwebtoken";
import { getFromEnv } from "../utils/getFromEnv.js";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export const userAuth = (req: Request, res: Response, next: NextFunction) => {

    const { secretKey } = getFromEnv()
    const token = req.header('token')
    console.log(token)
    if (token)
        jwt.verify(token, secretKey, async (err, decoded: any) => {
            if (err) {
                res.json({ error: "Token error or token not provided", err })
            } else if (decoded) {
                req.userId = decoded.userId
                next()
            }

        })
    else {
        res.json({ error: "token not provided" })
    }

}