import { Router } from 'express';
import { getSetting, saveSetting, updateSetting } from '../controllers';
import { authorize } from '../middleware/authMiddleware';

const router = Router();

router.get('/detail', getSetting);
router.post('/save', authorize(["ADMIN"]), saveSetting);
router.put('/edit', authorize(["ADMIN"]), updateSetting);

export default router;
