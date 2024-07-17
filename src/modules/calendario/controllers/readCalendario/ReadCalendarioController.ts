import { Request, Response } from "express";

import { ReadCalendarioUseCase } from "./ReadCalendarioUseCase";

class ReadCalendarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCalendarioUseCase = new ReadCalendarioUseCase();

    const showCalendario = await showCalendarioUseCase.execute({ id });

    if (showCalendario === 404) {
      return response.status(404)
        .send({ message: "Failed in Read Calendario." })
        .end();
    };

    return response.status(200).json(showCalendario);
  }
}

export { ReadCalendarioController };
