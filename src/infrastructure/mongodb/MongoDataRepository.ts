import { DataRepository } from '../../domain/repository/DataRepository';
import { Data } from '../../domain/entities/Data';
import { MongoClient, Collection } from 'mongodb';

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
}