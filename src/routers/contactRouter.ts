import { Router } from "express";
import { createContact, deleteContact, findAllContacts, findContactById } from "../controllers/contactController";

const router = Router();

router.get('/list', findAllContacts);
router.post('/create', createContact);
router.delete('/delete', deleteContact);
router.get('/detail/:id', findContactById);

export default router;