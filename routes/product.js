import express from "express";
import {
  deleteProductController,
  getProductByIdController,
  getProductsController,
  saveProductController,
  updateProductController,
} from "../controller/product.js";

const router = express.Router();

router.get("/", getProductsController);
router.get("/:id",getProductByIdController);
router.post("/", saveProductController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController);

export default router;