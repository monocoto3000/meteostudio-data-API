import { MongoDataRepository } from './mongodb/MongoDataRepository';
import { SaveAverageUseCase } from '../application/services/SaveAverageUseCase';
import { ReceiveDataController } from './controllers/ReciveDataController';
import { initAmqpLib } from './brokers/amqplib/Amqplib';

const mongoDataRepository = new MongoDataRepository('mongodb://localhost:27017/meteostudio');
const saveAverageUseCase = new SaveAverageUseCase(mongoDataRepository);
const amqpLib = initAmqpLib('amqp://52.6.228.180/');
const receiveDataController = new ReceiveDataController(saveAverageUseCase, amqpLib);

export { receiveDataController };