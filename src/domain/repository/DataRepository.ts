import { Data } from '../entities/Data';

export interface DataRepository {
  saveAverage(data: Data): Promise<void>;
  getMaxData(stationId: string, date: Date): Promise<Data | null>;
  getMinData(stationId: string, date: Date): Promise<Data | null>;
  getAllDataByStationId(stationId: string, startDate?: Date, endDate?: Date): Promise<Data[]>;
} 