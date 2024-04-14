import { Data } from '../entities/Data';

export interface DataRepository {
  saveAverage(data: Data): Promise<void>;
  getMaxData(stationId: string, date: string): Promise<Data | null>;
  getMinData(stationId: string, date: string): Promise<Data | null>;
  getAllDataByStationId(stationId: string, startDate?: Date, endDate?: Date): Promise<Data[]>;
} 