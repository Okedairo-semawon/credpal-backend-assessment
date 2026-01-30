import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { updateProduct } from "../controllers/productController";

const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg || "Invalid data sent",
        errors: errors.array(),
      });
      return;
    }
    next();
};
  
export const validateLogin = [
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 6 characters long."),
    handleValidationErrors,
]

export const validateSignup = [
    body("fullname")
      .notEmpty()
      .withMessage("Full name is required."),
    body("email")
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be 8 characters containing at least a special character, a number, an uppercase and lowercase letter"
      ),
    handleValidationErrors,
]

export const validateProductCreation = [
    body("name")
      .notEmpty()
      .withMessage("Product name is required."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),
    body("description")
      .notEmpty()
      .withMessage("Product description is required.")
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),
    handleValidationErrors,
]
export const validateUpdateProduct = [
    param("id")
      .isMongoId()
      .withMessage("Invalid product ID."),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Product name cannot be empty."),
    body("price")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Price must be a positive number."),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Product description cannot be empty.")
      .isLength({ min: 10, max: 2000 })
      .withMessage("Description must be between 10 and 2000 characters"),

    body("inStock")
      .optional()
      .isBoolean(),
    handleValidationErrors,
]