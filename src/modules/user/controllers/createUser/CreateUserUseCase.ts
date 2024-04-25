import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  email: string;
  password: string;
  grupoEmpresarialId: string;
  colaboradorId: string;
}

class CreateUserUseCase {
  async execute({
    email,
    password,
    grupoEmpresarialId,
    colaboradorId,
  }: IRequest) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashPass = await bcrypt.hash(password, salt);

      const user = await prisma.users.create({
        data: {
          email,
          password: hashPass,
          grupoEmpresarialId,
          colaboradorId,
        },
      });

      return user;
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { CreateUserUseCase };
