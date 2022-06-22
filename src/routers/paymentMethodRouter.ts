import { Router } from 'express';
import { createPaymentMethod, deletePaymentMethod, findAllPaymentMethod, findPaymentMethodById, updatePaymentMethod, updateStatusPaymentMethod } from '../controllers';

const router = Router();

router.get('/list', findAllPaymentMethod);
router.post('/create', createPaymentMethod);
router.put('/edit/:id', updateStatusPaymentMethod);
router.put('/edit', updatePaymentMethod);
router.delete('/delete/:id', deletePaymentMethod);
router.get('/detail/:id', findPaymentMethodById);

export default router;