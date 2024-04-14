import { DataRepository } from '../../domain/repository/DataRepository';
import mongoose, { Document, Schema, Model } from 'mongoose';
import { Data } from '../../domain/entities/Data';

export class MongoDataRepository implements DataRepository {
  private collection!: Model<Data & Document>;

  constructor(private readonly mongoUrl: string) {
    this.setupMongoDB();
  }

  private async setupMongoDB() {
    try {
      await mongoose.connect(this.mongoUrl);
      console.log('Connected to MongoDB successfully');
      const dataSchema = new Schema<Data & Document>({
        station_id: { type: String, required: true },
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
        radiation: { type: Number, required: true },
        createdAt: { type: String, required: true }
      });
      dataSchema.index({ station_id: 1 });
      dataSchema.index({ createdAt: 1 });
      this.collection = mongoose.model<Data & Document>('data', dataSchema, 'data');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  async saveAverage(data: Data): Promise<void> {
    await this.collection.create(data);
  }

  async getMaxData(stationId: string, date: string): Promise<Data | null> {
    try {
      const useDate = new Date(date);
      const startOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 23, 59, 59, 999);
      const results = await this.collection.find({ station_id: stationId, createdAt: { $gte: startOfDay, $lte: endOfDay } }).exec();
      if (results.length === 0) {
        return null;
      }
      let maxTemperature = Number.MIN_SAFE_INTEGER;
      let maxHumidity = Number.MIN_SAFE_INTEGER;
      let maxRadiation = Number.MIN_SAFE_INTEGER;
      let maxData: Data | null = null;
      results.forEach((result) => {
        const { temperature, humidity, radiation } = result;
        if (temperature > maxTemperature) {
          maxTemperature = temperature;
        }
        if (humidity > maxHumidity) {
          maxHumidity = humidity;
        }
        if (radiation > maxRadiation) {
          maxRadiation = radiation;
        }
      });

      maxData = {
        station_id: stationId,
        temperature: maxTemperature,
        humidity: maxHumidity,
        radiation: maxRadiation,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
      };

      return maxData;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }


  async getMinData(stationId: string, date: string): Promise<Data | null> {
    try {
      const useDate = new Date(date);
      const startOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 0, 0, 0, 0);
      const endOfDay = new Date(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), 23, 59, 59, 999);
      const results = await this.collection.find({ station_id: stationId, createdAt: { $gte: startOfDay, $lte: endOfDay } }).exec();

      if (results.length === 0) {
        return null;
      }
      let minTemperature = Infinity;
      let minHumidity = Infinity;
      let minRadiation = Infinity;

      results.forEach(result => {
        const { temperature, humidity, radiation } = result;
        if (temperature < minTemperature) {
          minTemperature = temperature;
        }
        if (humidity < minHumidity) {
          minHumidity = humidity;
        }
        if (radiation < minRadiation) {
          minRadiation = radiation;
        }
      });

      const minData: Data = {
        station_id: stationId,
        temperature: minTemperature,
        humidity: minHumidity,
        radiation: minRadiation,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
      };

      return minData;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  async getAllDataByStationId(stationId: string, startDate: Date, endDate: Date): Promise<Data[]> {
    try {
      console.log(`Fetching data for station ID ${stationId} for today`);

      const formattedStartDate = startDate.toLocaleDateString('en-US', { timeZone: 'America/Mexico_City' });
      const formattedEndDate = endDate.toLocaleDateString('en-US', { timeZone: 'America/Mexico_City' });

      const regexDateRange = new RegExp(`^(${formattedStartDate}|${formattedEndDate})`);

      const results = await this.collection.find({
        station_id: stationId,
        createdAt: { $regex: regexDateRange }
      }).exec();

      console.log(`Found ${results.length} results`);
      return results.map((result) => result.toObject() as Data);
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error obteniendo los datos por ID');
    }
  }




}
