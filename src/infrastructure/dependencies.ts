import { MongoDataRepository } from './mongodb/MongoDataRepository';
import { initAmqpLib } from './brokers/amqplib/Amqplib';

// Use Cases
import { SaveAverageUseCase } from '../application/services/SaveAverageUseCase';
import { GetMaxDataUseCase } from '../application/services/GetMaxDataUseCase';
import { GetMinDataUseCase } from '../application/services/GetMinDataUseCase';

// Controllers 
import { ReceiveDataController } from './controllers/ReciveDataController';
import { GetMaxDataController } from './controllers/GetMaxDataController';
import { GetMinDataController } from './controllers/GetMinDataController';

const mongoDataRepository = new MongoDataRepository('mongodb://localhost:27017/meteostudio');
const amqpLib = initAmqpLib('amqp://52.6.228.180/');

const saveAverageUseCase = new SaveAverageUseCase(mongoDataRepository);
const getMaxDataUseCase = new GetMaxDataUseCase(mongoDataRepository)
const getMinDataUseCase = new GetMinDataUseCase(mongoDataRepository)

const receiveDataController = new ReceiveDataController(saveAverageUseCase, amqpLib);
const getMaxDataController = new GetMaxDataController(getMaxDataUseCase)
const getMinDataController = new GetMinDataController(getMinDataUseCase)

export { 
    receiveDataController,
    getMaxDataController,
    getMinDataController
};