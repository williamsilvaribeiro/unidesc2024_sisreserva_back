import { Request, Response } from "express";

import { CreateColaboradorUseCase } from "./CreateColaboradorUseCase";

class CreateColaboradorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cpf,
      grupoEmpresarialId,
      dataDeNascimento,
      sexo,
      endereco,
      telefone,
      telefone2,
      celular,
      celular2,
      email,
      email2,
      medicina,
      empresas,
      mensagem,

      corNaAgenda
    } = request.body;

    const createColaboradorUseCase = new CreateColaboradorUseCase();

    const createColaborador = await createColaboradorUseCase.execute({
      nome,
      cpf,
      grupoEmpresarialId,
      dataDeNascimento,
      sexo,
      endereco,
      telefone,
      telefone2,
      celular,
      celular2,
      email,
      email2,
      medicina,
      empresas,
      mensagem,
      corNaAgenda,
    });

    if (createColaborador === 422) {
      return response.status(422)
        .send({ message: "Failed in Create Colaborador." })
        .end();
    };

    return response.status(201).json(createColaborador);
  }
}

export { CreateColaboradorController };
