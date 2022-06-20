import { Router } from "express";
import { createOrderStatus, findAllOrderStatus, findOrderStatusById, updateOrderStatus } from "../controllers/orderStatusController";

const router = Router();

router.get('/list', findAllOrderStatus);
router.post('/create', createOrderStatus);
router.get('/detail/:id', findOrderStatusById);
router.put('/edit', updateOrderStatus)

export default router;