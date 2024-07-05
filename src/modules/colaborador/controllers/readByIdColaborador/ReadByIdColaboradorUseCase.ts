import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadByIdColaboradorUseCase {
  async execute({ id }: IRequest) {
    try {
      const colaborador = await prisma.colaborador.findUnique({
        where: { id },
      });

      return colaborador;
    } catch (error) {
      logger.error(error);
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadByIdColaboradorUseCase };
