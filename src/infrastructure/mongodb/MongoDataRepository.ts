import { DataRepository } from '../../domain/repository/DataRepository';
import { Data } from '../../domain/entities/Data';
import { MongoClient, Collection } from 'mongodb';
import { DataModel } from './MongoDataModel';

export class MongoDataRepository implements DataRepository {
  private collection!: Collection<Data>;

  constructor(private readonly mongoUrl: string) {
    this.setupMongoDB();
  }

  private async setupMongoDB() {
    const client = await MongoClient.connect(this.mongoUrl);
    const db = client.db();
    this.collection = db.collection('data');
  }

  async saveAverage(data: Data): Promise<void> {
    await this.collection.insertOne(data);
  }

  async getMaxTemperature(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ temperature: -1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  async getMinTemperature(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ temperature: 1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  async getMaxHumidity(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ humidity: -1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  async getMinHumidity(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ humidity: 1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  async getMaxRadiation(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ radiation: -1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  async getMinRadiation(stationId: string): Promise<Data | null> {
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const result = await DataModel.findOne({
      station_id: stationId,
      createdAt: { $gte: startOfDay }
    })
      .sort({ radiation: 1 })
      .limit(1);
    return result !== null ? result.toObject() as Data : null;
  }

  // Get by ID

  async getDataByID(stationId: string): Promise<Data | null> {
    try {
      const result = await DataModel.findOne({ station_id: stationId });
      if (result) {
        return result.toObject() as Data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error obteniendo el dato por ID');
    }
  }

}