import { MongoDataRepository } from './mongodb/MongoDataRepository';
import { initAmqpLib } from './brokers/amqplib/Amqplib';

//
const USERNAME = "meteostudio"
const PASSWORD = encodeURIComponent("CMdui89!gdDDD145x?")
const HOSTNAME = "100.25.187.231"
const PORT = 5672

// Use Cases
import { SaveAverageUseCase } from '../application/services/SaveAverageUseCase';
import { GetMaxDataUseCase } from '../application/services/GetMaxDataUseCase';
import { GetMinDataUseCase } from '../application/services/GetMinDataUseCase';
import { GetDataByIDUseCase } from '../application/services/GetDataById';
import { GetDataByDateUseCase } from '../application/services/GetDataByDate';

// Controllers 
import { ReceiveDataController } from './controllers/ReciveDataController';
import { GetMaxDataController } from './controllers/GetMaxDataController';
import { GetMinDataController } from './controllers/GetMinDataController';
import { GetDataByIDController } from './controllers/GetDataByIDController';
import { GetDataByDateController } from './controllers/GetDataByDateController';

const mongoDataRepository = new MongoDataRepository('mongodb://50.17.41.245:27017');
const amqpLib = initAmqpLib(`amqp://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORT}`);

const saveAverageUseCase = new SaveAverageUseCase(mongoDataRepository, amqpLib);
const getMaxDataUseCase = new GetMaxDataUseCase(mongoDataRepository)
const getMinDataUseCase = new GetMinDataUseCase(mongoDataRepository)
const getDataByIdUseCase = new GetDataByIDUseCase(mongoDataRepository)
const getDataByDateUseCase = new GetDataByDateUseCase(mongoDataRepository)

const receiveDataController = new ReceiveDataController(saveAverageUseCase, amqpLib);
const getMaxDataController = new GetMaxDataController(getMaxDataUseCase)
const getMinDataController = new GetMinDataController(getMinDataUseCase)
const getDataByIdController = new GetDataByIDController(getDataByIdUseCase)
const getDataByDateController = new GetDataByDateController(getDataByDateUseCase)

export { 
    receiveDataController,
    getMaxDataController,
    getMinDataController,
    getDataByIdController,
    getDataByDateController
};