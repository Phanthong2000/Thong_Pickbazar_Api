import { Router } from 'express';
import { createProduct, deleteProduct, findAllProducts, getProductsByGroupId } from '../controllers/productController';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/list', findAllProducts);
router.post('/create', authorize(['ADMIN']), createProduct);
router.delete('/delete/:id', authorize(['ADMIN']), deleteProduct);
router.get('/list/group/:groupId', getProductsByGroupId);

export default router;
