import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IUser {
  id: string;
}

class DeleteUserUseCase {
  async execute({ id }: IUser) {
    try {
      const user = await prisma.users.update({
        where: { id },
        data: { ativo: false },
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

export { DeleteUserUseCase };
