import { Router } from 'express'
import { createAttribute, deleteAttribute, findAllAttributes, getAttributeByName, updateAttribute } from '../controllers/attributeController';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', findAllAttributes);
router.post('/create', authorize(["ADMIN"]), createAttribute);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteAttribute);
router.put('/edit', authorize(["ADMIN"]), updateAttribute);
router.get('/detail/name/:name', getAttributeByName)

export default router;