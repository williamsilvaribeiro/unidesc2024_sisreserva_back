import { Request, Response } from "express";

import { LoginUseCase } from "./LoginUseCase";

import {
  generateAccessToken,
  generateRefreshToken
} from "../../../utils/tokenGenerator";
import { PrismaClient } from "@prisma/client";


class LoginController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email) {
      return response.status(422).json({ message: "E-mail is required." });
    };

    if (!password) {
      return response.status(422).json({ message: "Password is required." });
    };

    const loginUseCase = new LoginUseCase();

    const login = await loginUseCase.execute({
      email, password
    });

    if (login === 404) {
      return response.status(404)
        .send({ message: "User not Found." })
        .end();
    }

    if (login === 401) {
      return response.status(401)
        .send({ message: "Invalid Password." })
        .end();
    }

    return response.status(201).json(login);
  }
};

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const prisma = new PrismaClient();

      const { refreshToken } = request.body;
      const reqRefreshToken = refreshToken;

      const sessionRefreshToken = await prisma.session.findFirstOrThrow({
        where: {
          refreshToken: reqRefreshToken,
        },
      })

      if (!reqRefreshToken) {
        await prisma.$disconnect()
        return response.status(401).json({ error: "Token is Missing." })
      };

      const newAccessToken = generateAccessToken(sessionRefreshToken.userId);
      const newRefreshToken = generateRefreshToken(sessionRefreshToken.userId);

      await prisma.session.update({
        where: {
          id: sessionRefreshToken.id
        },
        data: {
          refreshToken: newRefreshToken.toString(),
        }
      })

      await prisma.$disconnect()
      return response.status(201).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      return response.status(500).json({ error: error })
    }
  }
};

export {
  LoginController,
  RefreshTokenController
};
