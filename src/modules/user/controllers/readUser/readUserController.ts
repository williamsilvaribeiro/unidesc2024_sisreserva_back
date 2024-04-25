import { Request, Response } from "express";
import { ReadUserUseCase } from "./readUserUseCase";

class ReadUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showUserUseCase = new ReadUserUseCase();

    const showUser = await showUserUseCase.execute({});

    if (showUser === 401) {
      return response
        .status(401)
        .send({ message: "Failed in Read User" })
        .end();
    }

    return response.status(200).json(showUser);
  }
}

export { ReadUserController }
