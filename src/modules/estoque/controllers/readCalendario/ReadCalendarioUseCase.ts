import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadCalendarioUseCase {
  async execute({ id }: IRequest) {
    try {
      const calendarios = await prisma.calendario.findMany({
        where: { ativo: true },
      });

      return calendarios;
    } catch (error) {
      logger.error(error);
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadCalendarioUseCase };
