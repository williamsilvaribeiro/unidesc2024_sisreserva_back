import { PrismaClient } from '@prisma/client';
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface Colaborador {
  id: string
}

class DeleteColaboradorUseCase {
  async execute({
    id
  }: Colaborador) {
    try {
      
      await prisma.colaborador.update({ where: { id }, data: { ativo: false }})   

      return 201
    } catch (error) {
      logger.error(error)
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { DeleteColaboradorUseCase };
