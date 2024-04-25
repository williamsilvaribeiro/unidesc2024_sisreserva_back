import { Request, Response } from "express";

import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, grupoEmpresarialId, email, password, colaboradorId } = request.body;

    const updateUserUseCase = new UpdateUserUseCase();

    const updateUser = await updateUserUseCase.execute({
      id,
      grupoEmpresarialId,
      email,
      password,
      colaboradorId
    });

    if (updateUser === 401) {
      return response.status(401)
        .send({ message: "Failed in Update User." })
        .end();
    };

    return response.status(201).json(updateUser);
  }
}

export { UpdateUserController };
