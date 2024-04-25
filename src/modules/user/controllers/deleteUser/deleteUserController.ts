import { Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUserUseCase = new DeleteUserUseCase();

    const showUser = await showUserUseCase.execute({id});

    if (showUser === 401) {
      return response
        .status(401)
        .send({ message: "Failed in Read User" })
        .end();
    }

    return response.status(200).json(showUser);
  }
}

export { DeleteUserController };
