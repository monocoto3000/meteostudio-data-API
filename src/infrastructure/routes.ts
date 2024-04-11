import { Router } from 'express';
import { receiveDataController, getMaxDataController, getMinDataController, getDataByIdController, deliverDataToClientController } from './dependencies';

const router = Router();

router.post('/rtdata', (req, res) => deliverDataToClientController.run(req, res));
router.post('/', (req, res) => receiveDataController.handle(req, res));
router.get('/max/:stationId', (req, res) => getMaxDataController.getMaxDataByStationId(req, res))
router.get('/min/:stationId', (req, res) => getMinDataController.getMinDataByStationId(req, res));
router.post('/station', (req, res) => getDataByIdController.getDataByStationId(req, res));

export default router;