import { Router } from 'express';
import { createUser, deleteUser, findAllUser, findById, findUserByUsernameAndPassword, updateUser } from '../controllers';

const router = Router();

router.get('/list', findAllUser);
router.post('/create', createUser);
router.delete('/delete/:id', deleteUser);
router.get('/detail/:id', findById);
router.put('/update', updateUser);
router.post('/login', findUserByUsernameAndPassword);

export = router;
