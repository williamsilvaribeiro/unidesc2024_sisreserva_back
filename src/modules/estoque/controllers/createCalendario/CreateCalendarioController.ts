import { Request, Response } from "express";

import { CreateCalendarioUseCase } from "./CreateCalendarioUseCase";

class CreateCalendarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      dataAgendamento
    } = request.body;

    const createCalendarioUseCase = new CreateCalendarioUseCase();

    const createCalendario = await createCalendarioUseCase.execute({
      dataAgendamento
    });

    if (createCalendario === 422) {
      return response.status(422)
        .send({ message: "Failed in Create Calendario." })
        .end();
    };
    
    return response.status(201).json(createCalendario);
  }
}

export { CreateCalendarioController };
