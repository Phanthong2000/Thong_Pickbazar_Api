import { Router } from 'express'
import { createTag, deleteTag, findAllTags, getTagBySlug, updateTag } from '../controllers/tagController';

const router = Router();

router.get('/list', findAllTags);
router.post('/create', createTag);
router.delete('/delete/:id', deleteTag);
router.get('/detail/slug/:slug', getTagBySlug);
router.put('/edit', updateTag)

export default router;