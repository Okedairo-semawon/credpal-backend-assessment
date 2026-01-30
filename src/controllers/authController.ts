import { Request, Response, NextFunction } from "express";
import {UserModel} from "../models/userModel";
import bcrypt from "bcryptjs";
import _ from "lodash"
import { generateToken } from "../function/token";

export const signup = async (req: Request, res: Response, next:NextFunction ) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await UserModel.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists. Please login instead."
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new UserModel({
            fullname,
            email,
            password: hashedPassword,

        });

        await newUser.save();
        const userData = _.omit(newUser.toObject(), ['password']);

        return res.status(201).json ({
            success: true,
            message: "User created successfully",
            data: userData
        })
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next:NextFunction ) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        // find user
        const user = await UserModel. findOne({email});
        if (!user) {
            return res.status(404).json({message: "User not found. Please signup first."});
        }

        // check if the password is correct
        const correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token =  generateToken({ _id: user._id.toString() });

        // exclude sensitive data from the response
        const userData = _.omit(user.toObject(), ['password']);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: userData,
            token
        })

    } catch (error) {
        next(error)
    }
}