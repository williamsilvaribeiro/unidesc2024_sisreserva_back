import { Request, Response } from "express";

import { UpdateColaboradorUseCase } from "./UpdateColaboradorUseCase";

class UpdateColaboradorController {
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
      corNaAgenda,
      empresas,
      mensagem,
      tipoColaborador
    } = request.body;

    const { id } = request.params

    const updateColaboradorUseCase = new UpdateColaboradorUseCase();

    const updateColaborador = await updateColaboradorUseCase.execute({
      id,
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
      corNaAgenda,
      empresas,
      mensagem,
      tipoColaborador
    });

    if (updateColaborador === 422) {
      return response.status(422)
        .send({ message: "Failed in Update Colaborador." })
        .end();
    };

    return response.status(202).json(updateColaborador);
  }
}

export { UpdateColaboradorController };
