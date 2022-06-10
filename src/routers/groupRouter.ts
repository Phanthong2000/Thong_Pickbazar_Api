import { Router } from 'express'
import { createGroup, findAllGroup } from '../controllers';

const router = Router();

router.get("/list", findAllGroup);
router.post("/create", createGroup);

export default router