import { Request, Response } from "express";

import { DeleteCalendarioUseCase } from "./DeleteCalendarioUseCase";

class DeleteCalendarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCalendarioUseCase = new DeleteCalendarioUseCase();

    const deleteCalendario = await deleteCalendarioUseCase.execute({
      id
    });

    if (deleteCalendario === 404) {
      return response.status(404)
        .send({ message: "Failed in Delete Calendario." })
        .end();
    };

    return response.status(200).json(deleteCalendario);
  }
}

export { DeleteCalendarioController };
