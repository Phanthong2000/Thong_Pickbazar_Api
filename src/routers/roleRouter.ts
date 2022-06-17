import { Router } from "express";
import { createRole, findAllRoles } from "../controllers";
import { authorize } from "../middleware/authMiddleware";


const router = Router();
router.get('/list', authorize(["ADMIN"]), findAllRoles);
router.post('/create', authorize(["ADMIN"]), createRole);

export = router;