import { Router } from 'express';
import { createOrder, deleteOrder, findAllOrders, getAnalyticDashboard, getOrderById, topCustomer, updateOrder } from '../controllers';

const router = Router();

router.get('/list', findAllOrders);
router.post('/create', createOrder);
router.put('/edit', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/detail/:id', getOrderById);
router.get('/dashboard', getAnalyticDashboard);
router.get('/customer', topCustomer);

export default router;
