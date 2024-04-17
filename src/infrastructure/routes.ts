import { Router } from 'express';
import { receiveDataController, getMaxDataController, getMinDataController, getDataByIdController, getDataByDateController } from './dependencies';

const router = Router();

router.post('/', (req, res) => receiveDataController.handle(req, res));
router.post('/max/', (req, res) => getMaxDataController.getMaxDataByStationId(req, res))
router.post('/min/', (req, res) => getMinDataController.getMinDataByStationId(req, res));
router.post('/station', (req, res) => getDataByIdController.getDataByStationId(req, res));
router.post('/date', (req, res) => getDataByDateController.getDataByStationId(req, res));

export default router;