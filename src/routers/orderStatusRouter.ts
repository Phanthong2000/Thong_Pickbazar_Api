import { Router } from "express";
import { createOrderStatus, findAllOrderStatus, findOrderStatusById, updateOrderStatus } from "../controllers/orderStatusController";
import { authorize } from "../middleware/authMiddleware";

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllOrderStatus);
router.post('/create', authorize(["ADMIN"]), createOrderStatus);
router.get('/detail/:id', authorize(["ADMIN"]), findOrderStatusById);
router.put('/edit', authorize(["ADMIN"]), updateOrderStatus)

export default router;