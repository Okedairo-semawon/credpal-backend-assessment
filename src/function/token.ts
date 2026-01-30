import jwt from "jsonwebtoken";
import { Request } from "express";
import dotenv from "dotenv";
dotenv.config();


interface tokenPayload {
    _id: string
}

const JWT = process.env.JWT_SECRET_KEY as string;
export const generateToken = (payload: tokenPayload) => {
    return jwt.sign(
        payload, JWT,
        { expiresIn: "1d" }
    )
}

export const decodeToken = (token: string): tokenPayload => {
    try {
        return jwt.verify(token, JWT) as tokenPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export const getIdFromToken = (req: Request):string => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("No token provided");
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            throw new Error("Invalid authorization header format");
        };
        
        const token = parts[1];
        const decoded = jwt.verify(token, JWT) as tokenPayload;
        return decoded._id;

    } catch (error) {
        throw new Error("Invalid token");
    }
}