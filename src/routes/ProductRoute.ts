import { Router } from "express";
import {
    getAllProducts,
    getProductByID,
    createproduct,
    updateProduct,
    deleteProduct
}   from "../controllers/productController"; 
import { Product } from "../entities/Product";

const productRoute = Router(); 

productRoute.get("products/", getAllProducts);
productRoute.get("products/:id", getProductByID);
productRoute.post("products/", createProduct);
productRoute.put("products/:id", updateProduct);
productRoute.delete("products/:id", deleteProduct);

export default productRoute;

