import { Router } from 'express';
import { getSetting, saveSetting, updateSetting } from '../controllers';

const router = Router();

router.get('/detail', getSetting);
router.post('/save', saveSetting);
router.put('/edit', updateSetting);

export default router;
