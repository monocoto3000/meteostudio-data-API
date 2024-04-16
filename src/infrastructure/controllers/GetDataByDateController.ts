import { GetDataByDateUseCase } from '../../application/services/GetDataByDate';
import { Request, Response } from 'express';

export class GetDataByDateController {
  constructor(private readonly getDataByDateUseCase: GetDataByDateUseCase) { }
  async getDataByStationId(req: Request, res: Response): Promise<void> {
    console.log('getDataByStationId se esta ejecutando');
    const { stationId, startDate, endDate } = req.body;
    console.log(req.body);
    if (!stationId || stationId.trim() === '') {
      res.status(400).json({ error: 'Datos incorrectos o faltantes' });
      return;
    }
    try {
      const data = await this.getDataByDateUseCase.execute(stationId, startDate, endDate);
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
