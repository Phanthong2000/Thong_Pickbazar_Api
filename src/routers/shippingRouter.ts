import { Router } from 'express';
import { createShipping, deleteShipping, findAllShippings, getShippingByName, updateShipping } from '../controllers';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllShippings);
router.post('/create', authorize(["ADMIN"]), createShipping);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteShipping);
router.put('/edit', authorize(["ADMIN"]), updateShipping);
router.get('/detail/name/:name', authorize(["ADMIN"]), getShippingByName);

export default router;
