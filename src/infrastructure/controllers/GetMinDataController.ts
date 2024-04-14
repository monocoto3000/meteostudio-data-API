import { GetMinDataUseCase } from '../../application/services/GetMinDataUseCase';
import { Request, Response } from 'express';

export class GetMinDataController {
  constructor(private readonly getMinDataUseCase: GetMinDataUseCase) { }

  async getMinDataByStationId(req: Request, res: Response) {
    const { stationId } = req.body;
    try {
      const minData = await this.getMinDataUseCase.getMinData(stationId);
      res.status(200).json(minData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}