import { MongoDataRepository } from './mongodb/MongoDataRepository';
import { initAmqpLib } from './brokers/amqplib/Amqplib';
import { SocketIO } from './socket/socketIO/SocketIO';

// Use Cases
import { SaveAverageUseCase } from '../application/services/SaveAverageUseCase';
import { GetMaxDataUseCase } from '../application/services/GetMaxDataUseCase';
import { GetMinDataUseCase } from '../application/services/GetMinDataUseCase';
import { GetDataByIDUseCase } from '../application/services/GetDataById';

import { DeliverDataToClientUseCase } from '../application/services/DeliverDataToClient';

// Controllers 
import { ReceiveDataController } from './controllers/ReciveDataController';
import { GetMaxDataController } from './controllers/GetMaxDataController';
import { GetMinDataController } from './controllers/GetMinDataController';
import { GetDataByIDController } from './controllers/GetDataByIDController';
import { DeliverDataToClientController } from './controllers/DeliverDataToClientController';

const mongoDataRepository = new MongoDataRepository('mongodb://localhost:27017/meteostudio');
const amqpLib = initAmqpLib('amqp://52.6.228.180/');
const socketIO = new SocketIO('http://localhost:4000');

const saveAverageUseCase = new SaveAverageUseCase(mongoDataRepository, amqpLib);
const getMaxDataUseCase = new GetMaxDataUseCase(mongoDataRepository)
const getMinDataUseCase = new GetMinDataUseCase(mongoDataRepository)
const getDataByIdUseCase = new GetDataByIDUseCase(mongoDataRepository)
const deliverDataToClienteUseCase = new DeliverDataToClientUseCase(socketIO)

const receiveDataController = new ReceiveDataController(saveAverageUseCase, amqpLib);
const getMaxDataController = new GetMaxDataController(getMaxDataUseCase)
const getMinDataController = new GetMinDataController(getMinDataUseCase)
const getDataByIdController = new GetDataByIDController(getDataByIdUseCase)
const deliverDataToClientController = new DeliverDataToClientController(deliverDataToClienteUseCase)

export { 
    receiveDataController,
    getMaxDataController,
    getMinDataController,
    getDataByIdController,
    deliverDataToClientController
};