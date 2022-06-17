import { Router } from "express";
import { createProduct, deleteProduct, findAllProducts } from "../controllers/productController";
import { authorize } from "../middleware/authMiddleware";

const router = Router();

router.get('/list', findAllProducts);
router.post('/create', authorize(["ADMIN"]), createProduct);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteProduct)

export default router;