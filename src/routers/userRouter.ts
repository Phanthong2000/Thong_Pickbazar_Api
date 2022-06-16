import { Router } from "express";
import { findAllUsers } from "../controllers";

const router = Router();

router.get('/list', findAllUsers);

export default router;