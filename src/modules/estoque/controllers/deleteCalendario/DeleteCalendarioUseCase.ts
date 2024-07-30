import { PrismaClient } from '@prisma/client';
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface Calendario {
  id: string
}

class DeleteCalendarioUseCase {
  async execute({
    id
  }: Calendario) {
    try {
      
      await prisma.calendario.update({ where: { id }, data: { ativo: false }})   

      return 201
    } catch (error) {
      logger.error(error)
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { DeleteCalendarioUseCase };
