import { Router } from 'express';
import { createCategory, deleteCategory, findAllCategories, findCategoryById, getAllCategoriesByGroupAndLangCode, updateCategory } from '../controllers';

const router = Router();

router.get('/list', findAllCategories);
router.post('/create', createCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/detail/:id', findCategoryById);
router.put('/edit', updateCategory);
router.get('/list/langcode/:groupId', getAllCategoriesByGroupAndLangCode);

export default router;
