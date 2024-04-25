import { Request, Response } from "express";

import { DeleteColaboradorUseCase } from "./DeleteColaboradorUseCase";

class DeleteColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteColaboradorUseCase = new DeleteColaboradorUseCase();

    const deleteColaborador = await deleteColaboradorUseCase.execute({
      id
    });

    if (deleteColaborador === 404) {
      return response.status(404)
        .send({ message: "Failed in Delete Colaborador." })
        .end();
    };

    return response.status(200).json(deleteColaborador);
  }
}

export { DeleteColaboradorController };
