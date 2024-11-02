import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";
import { createCategory,deletecategoryById,getAllCategory,updateCategory } from "../control/categoryController.js";
import productRouter from "./productRoutes.js";
const router = express.Router();

router.post('/', authenticate, authorizeAdmin, createCategory)
router.get('/', getAllCategory)
router.put('/:id', authenticate, authorizeAdmin,  updateCategory);
router.delete("/:id", deletecategoryById);

export default router;