import { Request, Response } from "express";

import { ReadColaboradorUseCase } from "./ReadColaboradorUseCase";

class ReadColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showColaboradorUseCase = new ReadColaboradorUseCase();

    const showColaborador = await showColaboradorUseCase.execute({ id });

    if (showColaborador === 404) {
      return response.status(404)
        .send({ message: "Failed in Read Colaborador." })
        .end();
    };

    return response.status(200).json(showColaborador);
  }
}

export { ReadColaboradorController };
