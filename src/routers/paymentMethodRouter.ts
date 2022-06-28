import { Router } from 'express';
import { createPaymentMethod, deletePaymentMethod, findAllPaymentMethod, findPaymentMethodById, getAllPaymentMethodsActive, updatePaymentMethod, updateStatusPaymentMethod } from '../controllers';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllPaymentMethod);
router.post('/create', authorize(["ADMIN"]), createPaymentMethod);
router.put('/edit/:id', authorize(["ADMIN"]), updateStatusPaymentMethod);
router.put('/edit', authorize(["ADMIN"]), updatePaymentMethod);
router.delete('/delete/:id', authorize(["ADMIN"]), deletePaymentMethod);
router.get('/detail/:id', authorize(["ADMIN"]), findPaymentMethodById);
router.get('/list/active', getAllPaymentMethodsActive);

export default router;
