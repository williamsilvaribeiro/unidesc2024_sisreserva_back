import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface Calendario {
  id: string;
  dataAgendamento: number;
}

class UpdateCalendarioUseCase {
  async execute({
    id,
    dataAgendamento,
  }: Calendario) {
    try {
      const transaction = await prisma.$transaction(async (prisma) => {
        await prisma.calendario.update({
          where: { id },
          data: {
            dataAgendamento
          },
        });
      });
      return transaction;
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { UpdateCalendarioUseCase };
