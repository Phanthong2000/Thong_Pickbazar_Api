import { Router } from 'express';
import { createAccount, deleteAccount, findAccountById, findAccountByUsernamePassword, findAllAccount, updateAccount } from '../controllers';

const router = Router();

router.get('/list', findAllAccount);
router.post('/create', createAccount);
router.get('/detail/:id', findAccountById);
router.delete('/delete/:id', deleteAccount);
router.put('/update', updateAccount);
router.get('/usernameAndPassword', findAccountByUsernamePassword);
export = router;
