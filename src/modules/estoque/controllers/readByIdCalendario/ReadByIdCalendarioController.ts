import { Request, Response } from "express";

import { ReadByIdCalendarioUseCase } from "./ReadByIdCalendarioUseCase";

class ReadByIdCalendarioController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readCalendarioUseCase = new ReadByIdCalendarioUseCase();

    const readCalendario = await readCalendarioUseCase.execute({ id });

    if (readCalendario === 404) {
      return response.status(404)
        .send({ message: "Failed in ReadById Calendario." })
        .end();
    };

    return response.status(200).json(readCalendario);
  }
}

export { ReadByIdCalendarioController };
