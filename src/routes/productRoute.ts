import express from "express";
import { 
    createProduct, 
    getAllProducts, 
    getProductById,
    updateProduct,
    deleteProduct 
} from "../controllers/productController";

import { validateProductCreation, validateUpdateProduct } from "../middlewares/validator";
import { verifyToken } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/create", verifyToken, validateProductCreation, createProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.put("/update/:id", verifyToken, validateUpdateProduct, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router;