import jwt from "jsonwebtoken"
import { getFromEnv } from "./getFromEnv.js"

export const generateToken = (payload: {}) => {
    const { secretKey } = getFromEnv()
    let token = jwt.sign(payload, secretKey)
    return token
}