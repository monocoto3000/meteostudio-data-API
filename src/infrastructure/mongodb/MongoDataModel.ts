import { Schema, model, Document } from 'mongoose';
import { Data } from '../../domain/entities/Data';

const DataSchema = new Schema<Data & Document>({
  station_id: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  radiation: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
});

export const DataModel = model<Data & Document>('data', DataSchema);