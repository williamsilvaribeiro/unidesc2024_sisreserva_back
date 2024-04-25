import { Request, Response } from "express";

import { ReadEspecialidadesByColaboradorUseCase } from "./ReadEspecialidadesByColaboradorUseCase";

class ReadEspecialidadesByColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const readColaboradorUseCase = new ReadEspecialidadesByColaboradorUseCase();

    const readColaborador = await readColaboradorUseCase.execute({ id });

    if (readColaborador === 404) {
      return response.status(404)
        .send({ message: "Failed in ReadById Colaborador." })
        .end();
    };

    return response.status(200).json(readColaborador);
  }
}

export { ReadEspecialidadesByColaboradorController };
