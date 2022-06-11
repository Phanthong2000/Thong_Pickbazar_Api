import { Router } from 'express'
import { createGroup, deleteGroup, findAllGroup, getAllGroupsByLangCode, getGroupByIdAndLangCode } from '../controllers';

const router = Router();

router.get("/list", findAllGroup);
router.post("/create", createGroup);
router.delete("/delete/:id", deleteGroup);
router.get("/list/lang", getAllGroupsByLangCode);
router.get('/detail/lang/:id', getGroupByIdAndLangCode)

export default router