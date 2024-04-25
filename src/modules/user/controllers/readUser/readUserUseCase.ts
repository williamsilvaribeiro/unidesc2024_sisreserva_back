import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

class ReadUserUseCase {
  async execute({}) {
    try {
      const user = await prisma.users.findMany({
        where: {
          ativo: true,
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

export { ReadUserUseCase };
