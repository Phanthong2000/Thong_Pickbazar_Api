import { Router } from "express";
import { createAccount, findAllAccount } from '../controllers'

const router = Router();

router.get('/list', findAllAccount)
router.post('/create', createAccount);
export = router;