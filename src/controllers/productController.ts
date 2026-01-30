import {Request, Response, NextFunction } from "express";
import { Product } from "../models/productModel";
import { getIdFromToken } from "../function/token";
import { UserModel } from "../models/userModel";


export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description} = req.body;
        const user = await UserModel.findById(getIdFromToken(req));

        if (!user) {
            return res.status(401).json({ message: "Unauthorized. User not found." });
        }

        if (!name || price === undefined || !description) {
            return res.status(400).json({ message: "Name, price, and description are required." });
        }

        if (price < 0) {
            return res.status(400).json({ message: "Price cannot be negative." });
        }

        const newProduct = new Product({
            name,
            price,
            description,
            inStock: true,
            createdBy: user._id
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
}

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find().populate("createdBy", "fullname email");
        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products
        });
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate("createdBy", "fullname email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null
            });
        }

        if (product.createdBy.toString() !== (req as any).user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this product",
                data: null
            });
        }

        const updates: any = {};
        const allowedUpdates = ["name", "price", "description", "inStock"];
        for (const key of allowedUpdates) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: updates
        }, {
            new: true
        })

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                data: null
            });
        }
        if (product.createdBy.toString() !== (req as any).user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product",
                data: null
            });
        }

        await product.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}