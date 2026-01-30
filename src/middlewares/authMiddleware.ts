import { decodeToken } from "../function/token";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req:Request, res: Response, next: NextFunction) => {
    try {
        // get the token from the authorization header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({message: "Access denied. No token provided."});
        }

        // decode the token
        const decoded = decodeToken(token);

        // attach the decoded token to the req.user
        (req as any).user =  {
            id: decoded._id
        }
        next();
    } catch (error) {
        return res.status(400).json({message: "Invalid token."});
    }
}