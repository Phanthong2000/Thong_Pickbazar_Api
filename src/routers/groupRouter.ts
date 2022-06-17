import { Router } from 'express';
import { createGroup, deleteGroup, findAllGroup, getAllGroupsByLangCode, getGroupByIdAndLangCode, getGroupByName, updateGroup } from '../controllers';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllGroup);
router.post('/create', authorize(["ADMIN"]), createGroup);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteGroup);
router.get('/list/lang', getAllGroupsByLangCode);
router.get('/detail/lang/:id', getGroupByIdAndLangCode);
router.get('/detail/name/:name', getGroupByName);
router.put('/edit', authorize(["ADMIN"]), updateGroup);

export default router;
