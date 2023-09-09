import jwt from "jsonwebtoken";
import { getFromEnv } from "./getFromEnv.js";
export const generateToken = (res, userId) => {
    const { secretKey } = getFromEnv();
    let token = jwt.sign({ userId }, secretKey);
    // Set JWT as an HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
