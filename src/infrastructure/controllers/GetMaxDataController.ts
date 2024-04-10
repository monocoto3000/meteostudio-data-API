import { GetMaxDataUseCase } from '../../application/services/GetMaxDataUseCase';
import { Request, Response } from 'express';

export class GetMaxDataController {
  constructor(private readonly getMaxDataUseCase: GetMaxDataUseCase) {}

  async getMaxDataByStationId(req: Request, res: Response) {
    const stationId = req.params.stationId;
    try {
      const maxData = await this.getMaxDataUseCase.getMaxData(stationId);
      res.status(200).json(maxData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}