import { Router } from 'express';
import { createGroup, deleteGroup, findAllGroup, getAllGroupsByLangCode, getGroupByIdAndLangCode, getGroupByName, updateGroup } from '../controllers';

const router = Router();

router.get('/list', findAllGroup);
router.post('/create', createGroup);
router.delete('/delete/:id', deleteGroup);
router.get('/list/lang', getAllGroupsByLangCode);
router.get('/detail/lang/:id', getGroupByIdAndLangCode);
router.get('/detail/name/:name', getGroupByName);
router.put('/edit', updateGroup);

export default router;
