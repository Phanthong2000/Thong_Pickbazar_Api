import { Router } from 'express'
import { createAttribute, deleteAttribute, findAllAttributes, getAttributeByName, updateAttribute } from '../controllers/attributeController';

const router = Router();

router.get('/list', findAllAttributes);
router.post('/create', createAttribute);
router.delete('/delete/:id', deleteAttribute);
router.put('/edit', updateAttribute);
router.get('/detail/name/:name', getAttributeByName)

export default router;