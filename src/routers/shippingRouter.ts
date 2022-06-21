import { Router } from 'express';
import { createShipping, deleteShipping, findAllShippings, getShippingByName, updateShipping } from '../controllers';

const router = Router();

router.get('/list', findAllShippings);
router.post('/create', createShipping);
router.delete('/delete/:id', deleteShipping);
router.put('/edit', updateShipping);
router.get('/detail/name/:name', getShippingByName);

export default router;
