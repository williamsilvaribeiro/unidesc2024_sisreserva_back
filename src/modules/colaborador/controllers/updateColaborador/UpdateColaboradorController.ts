import { Request, Response } from "express";

import { UpdateColaboradorUseCase } from "./UpdateColaboradorUseCase";

class UpdateColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cpf,
      dataDeNascimento,
      telefone,
      celular,
      email,
      cargo,
      curso,
    } = request.body;

    const { id } = request.params;

    const updateColaboradorUseCase = new UpdateColaboradorUseCase();

    const updateColaborador = await updateColaboradorUseCase.execute({
      id,
      nome,
      cpf,
      dataDeNascimento,
      telefone,
      celular,
      email,
      cargo,
      curso,
    });

    if (updateColaborador === 422) {
      return response
        .status(422)
        .send({ message: "Failed in Update Colaborador." })
        .end();
    }

    if (updateColaborador instanceof Error) {
      return response
        .status(409)
        .send({ message: updateColaborador.message })
        .end();
    }

    return response.status(202).json(updateColaborador);
  }
}

export { UpdateColaboradorController };
