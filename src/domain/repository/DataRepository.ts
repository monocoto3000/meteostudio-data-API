import { Data } from '../entities/Data';

export interface DataRepository {
  saveAverage(data: Data): Promise<void>;
  getMaxTemperature(stationId: string): Promise<Data | null>;
  getMinTemperature(stationId: string): Promise<Data | null>;
  getMaxHumidity(stationId: string): Promise<Data | null>;
  getMinHumidity(stationId: string): Promise<Data | null>;
  getMaxRadiation(stationId: string): Promise<Data | null>;
  getMinRadiation(stationId: string): Promise<Data | null>;
  getDataByID(stationId: string): Promise<Data | null>
}