import { Request, Response } from "express";

import { CreateColaboradorUseCase } from "./CreateColaboradorUseCase";

class CreateColaboradorController {
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

    const createColaboradorUseCase = new CreateColaboradorUseCase();

    const createColaborador = await createColaboradorUseCase.execute({
      nome,
      cpf,
      dataDeNascimento,
      telefone,
      celular,
      email,
      cargo,
      curso,
    });

    if (createColaborador === 422) {
      return response.status(422)
        .send({ message: "Failed in Create Colaborador." })
        .end();
    };

    if(createColaborador instanceof Error){
      return response
        .status(409)
        .send({ message:  createColaborador.message})
        .end();
    }

    return response.status(201).json(createColaborador);
  }
}

export { CreateColaboradorController };
