import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { grupoEmpresarialId, email, password, colaboradorId } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const createUser = await createUserUseCase.execute({
      grupoEmpresarialId,
      email,
      password,
      colaboradorId,
    });

    if (createUser === 422) {
      return response
        .status(422)
        .send({ message: "Failed in Create User." })
        .end();
    }

    return response.status(201).json(createUser);
  }
}

export { CreateUserController };
