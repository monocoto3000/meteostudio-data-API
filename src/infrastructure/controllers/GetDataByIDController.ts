import { GetDataByIDUseCase } from '../../application/services/GetDataById';
import { Request, Response } from 'express';

export class GetDataByIDController {
  constructor(private readonly getDataByIDUseCase: GetDataByIDUseCase) { }
  async getDataByStationId(req: Request, res: Response): Promise<void> {
    const { stationId } = req.body;
    try {
      const data = await this.getDataByIDUseCase.execute(stationId);
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'No se encontraron datos' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
