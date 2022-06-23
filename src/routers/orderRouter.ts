import { Router } from 'express';
import { createOrder, deleteOrder, findAllOrders, updateOrder } from '../controllers';

const router = Router();

router.get('/list', findAllOrders);
router.post('/create', createOrder);
router.put('/edit', updateOrder);
router.delete('/delete/:id', deleteOrder);

export default router;
