import { Router } from 'express';
import { createOrder, deleteOrder, findAllOrders, getOrderById, updateOrder } from '../controllers';

const router = Router();

router.get('/list', findAllOrders);
router.post('/create', createOrder);
router.put('/edit', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/detail/:id', getOrderById);

export default router;
