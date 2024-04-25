import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
  email: string;
  password: string;
  grupoEmpresarialId: string;
  colaboradorId: string;
}

class UpdateUserUseCase {
  async execute({ id, email, password, grupoEmpresarialId, colaboradorId }: IRequest) {
    try {
      const salt = await bcrypt.genSalt(12);
      const hashPass = await bcrypt.hash(password, salt);

      const user = await prisma.users.update({
        where: { email },
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
      return 401;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { UpdateUserUseCase };
