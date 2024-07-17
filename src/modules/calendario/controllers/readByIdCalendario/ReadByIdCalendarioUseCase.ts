import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadByIdCalendarioUseCase {
  async execute({ id }: IRequest) {
    try {
      const calendario = await prisma.calendario.findUnique({
        where: { id },
      });

      return calendario;
    } catch (error) {
      logger.error(error);
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadByIdCalendarioUseCase };
