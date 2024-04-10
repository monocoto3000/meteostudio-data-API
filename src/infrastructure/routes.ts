import { Router } from 'express';
import { receiveDataController } from './dependencies';

const router = Router();

router.post('/', (req, res) => receiveDataController.handle(req, res));

export default router;