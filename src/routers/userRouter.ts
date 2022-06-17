import { authorize } from './../middleware/authMiddleware';
import { Router } from "express";
import { findAllUsers } from "../controllers";

const router = Router();

router.get('/list', authorize(["ADMIN"]), findAllUsers);

export default router;