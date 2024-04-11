import { Response, Request } from "express";
import { DeliverDataToClientUseCase } from "../../application/services/DeliverDataToClient";

export class DeliverDataToClientController {
  constructor(private readonly deliverDataToClientUseCase: DeliverDataToClientUseCase) { }

  async run(req: Request, res: Response) {
    console.log("DelivarData esta ejecutandose")
    try {
      const data = req.body;
      console.log("..................")
      console.log("Deliver data recibido: ")
      console.log(data)
      console.log("..................")
      if (!data) {
        return res.status(404).send("Datos no encontrados");
      }
      await this.deliverDataToClientUseCase.run(data);
      res.status(200).send("Datos enviados correctamente");
    } catch (err: any) {
      console.log(err);
      res.status(500).send("Error al enviar los datos");
    }
  }  

}
