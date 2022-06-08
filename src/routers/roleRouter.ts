import { Router } from "express";
import { createRole, findAllRoles } from "../controllers";


const router = Router();
router.get('/list', findAllRoles);
router.post('/create', createRole);

export = router;