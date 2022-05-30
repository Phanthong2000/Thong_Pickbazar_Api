import express from 'express';
import { sampleHealthCheck } from '../controllers';

const router = express.Router();
router.get('/ping', sampleHealthCheck);

export = router;
