import { Router } from "express";
import { createNotification, findAllNotification } from "../controllers";

const router = Router();

router.get('/list', findAllNotification);
router.post('/create', createNotification);

export default router;
