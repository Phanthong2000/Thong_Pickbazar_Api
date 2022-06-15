import { Router } from "express";
import { createProduct, deleteProduct, findAllProducts } from "../controllers/productController";

const router = Router();

router.get('/list', findAllProducts);
router.post('/create', createProduct);
router.delete('/delete/:id', deleteProduct)

export default router;