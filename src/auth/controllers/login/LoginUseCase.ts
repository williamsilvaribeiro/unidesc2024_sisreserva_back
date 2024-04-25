import bcrypt from "bcrypt";

import logger from "../../../utils/logger";
import {
  generateAccessToken,
  generateRefreshToken
} from "../../../utils/tokenGenerator";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IRequest {
  email: string;
  password: string;
}

class LoginUseCase {
  async execute({
    email,
    password
  }: IRequest) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });

      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        try {
          const accessToken = generateAccessToken(user.colaboradorId);
          const refreshToken = generateRefreshToken(user.colaboradorId);

          await prisma.session.create({
            data: {
              refreshToken: refreshToken.toString(),
              userId: user.id
            }
          })

          await prisma.$disconnect()
          return ({
            geId: user.grupoEmpresarialId,
            accessToken,
            refreshToken
          });
        } catch (error) {
          logger.error(error);
        };
      } else {
        return 401;
      }
    } catch (error) {
      return 404;
    }
  }
}

export { LoginUseCase };
