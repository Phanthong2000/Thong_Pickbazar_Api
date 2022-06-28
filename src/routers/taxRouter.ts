import { Router } from "express";
import { createTax, deleteTax, findAllTaxes, findTaxById, getTaxByName, getTaxForOrder, updateStatus, updateTax } from "../controllers";
import { authorize } from "../middleware/authMiddleware";

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllTaxes);
router.post('/create', authorize(["ADMIN"]), createTax);
router.get('/detail/:id', authorize(["ADMIN"]), findTaxById);
router.delete("/delete/:id", authorize(["ADMIN"]), deleteTax);
router.put('/edit', authorize(["ADMIN"]), updateTax);
router.get('/detail/name/:name', authorize(["ADMIN"]), getTaxByName);
router.put('/edit/:id', authorize(["ADMIN"]), updateStatus);
router.get('/detail/order/active', getTaxForOrder)

export default router;