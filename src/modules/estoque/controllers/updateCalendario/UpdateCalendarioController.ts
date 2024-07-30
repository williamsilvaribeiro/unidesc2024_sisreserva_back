import { Request, Response } from "express";

import { UpdateCalendarioUseCase } from "./UpdateCalendarioUseCase";

class UpdateCalendarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      dataAgendamento
    } = request.body;

    const { id } = request.params;

    const updateCalendarioUseCase = new UpdateCalendarioUseCase();

    const updateCalendario = await updateCalendarioUseCase.execute({
      id,
      dataAgendamento
    });

    if (updateCalendario === 422) {
      return response
        .status(422)
        .send({ message: "Failed in Update Calendario." })
        .end();
    }

    return response.status(202).json(updateCalendario);
  }
}

export { UpdateCalendarioController };
