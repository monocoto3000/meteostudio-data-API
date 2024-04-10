import { Data } from '../entities/Data';

export interface DataRepository {
  saveAverage(data: Data): Promise<void>;
}