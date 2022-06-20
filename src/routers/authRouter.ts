import { Router } from 'express';
import { login, refreshToken, registry } from '../controllers/authController';

const router = Router();

router.post('/registry/:role', registry);
router.post('/login/:role', login);
router.post('/refresh-token', refreshToken);

export default router;
