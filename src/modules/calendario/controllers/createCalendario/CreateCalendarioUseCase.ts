import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface Calendario {
  dataAgendamento: number;
}

class CreateCalendarioUseCase {
  async execute({
    dataAgendamento
  }: Calendario) {
    try {
      const transaction = await prisma.$transaction(async (prisma) => {
        await prisma.calendario.create({
          data: {
            dataAgendamento
          },
        });
      });
      return transaction
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { CreateCalendarioUseCase };
