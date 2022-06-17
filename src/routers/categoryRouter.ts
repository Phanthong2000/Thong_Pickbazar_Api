import { Router } from 'express';
import { createCategory, deleteCategory, findAllCategories, findCategoryById, getAllCategoriesByGroup, getAllCategoriesByGroupAndLangCode, updateCategory } from '../controllers';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllCategories);
router.post('/create', authorize(["ADMIN"]), createCategory);
router.delete('/delete/:id', authorize(["ADMIN"]), deleteCategory);
router.get('/detail/:id', findCategoryById);
router.put('/edit', authorize(["ADMIN"]), updateCategory);
router.get('/list/langcode/:groupId', getAllCategoriesByGroupAndLangCode);
router.get('/detail/groupId/:groupId', getAllCategoriesByGroup)

export default router;
