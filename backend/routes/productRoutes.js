import express from "express";
import formidable from "express-formidable";
import checkId from "../middlewares/checkId.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";
import { addProduct, updateProduct, fetchNewProduct,fetchTopProduct, addProductReview, removeProduct, fetchAllProducts, fetchProductById, fetchProduct } from "../control/productController.js";
const productRouter =express.Router();
console.log('we ar ehere')
productRouter.post('/', authenticate, authorizeAdmin, formidable(), addProduct);
productRouter.put('/:id', authenticate, authorizeAdmin, formidable(), updateProduct);
productRouter.delete('/:id',  authenticate, authorizeAdmin, formidable(), removeProduct );
productRouter.get('/allproducts', fetchAllProducts );
productRouter.get('/:id', fetchProductById );
productRouter.get('/', fetchProduct );
productRouter.post('/:id/reviews', authenticate, checkId, addProductReview);
productRouter.get("/top", fetchTopProduct);

productRouter.get('/new', fetchNewProduct);

export default productRouter;
