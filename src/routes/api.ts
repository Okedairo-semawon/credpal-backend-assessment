import { Router } from "express";
import userRoute from "./userRoute";
import productRoute from "./productRoute";
const router = Router();

router.use("/auth", userRoute);
router.use("/product", productRoute);
export default router;