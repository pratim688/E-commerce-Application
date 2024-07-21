// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products 

//if you want to filter then post man query looks like-Localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Category1
productRouter.get(
    '/filter',
    productController.filterProducts
);

productRouter.get(
    '/', 
productController.getAllProducts
);
productRouter.post(
    '/', 
upload.single('imageUrl'), 
productController.addProduct);
productRouter.get("/:id",productController.getOneProduct)
productRouter.post('/rate',productController.rateProduct);

export default productRouter;