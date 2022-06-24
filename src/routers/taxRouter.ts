import { Router } from "express";
import { createTax, deleteTax, findAllTaxes, findTaxById, getTaxByName, getTaxForOrder, updateStatus, updateTax } from "../controllers";

const router = Router();

router.get('/list', findAllTaxes);
router.post('/create', createTax);
router.get('/detail/:id', findTaxById);
router.delete("/delete/:id", deleteTax);
router.put('/edit', updateTax);
router.get('/detail/name/:name', getTaxByName);
router.put('/edit/:id', updateStatus);
router.get('/detail/order/active', getTaxForOrder)

export default router;