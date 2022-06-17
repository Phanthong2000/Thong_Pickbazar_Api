import { Router } from 'express'
import { createTag, deleteTag, findAllTags, getTagBySlug, updateTag } from '../controllers/tagController';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllTags);
router.post('/create', authorize(["ADMIN"]), createTag);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteTag);
router.get('/detail/slug/:slug', getTagBySlug);
router.put('/edit', authorize(["ADMIN"]), updateTag)

export default router;