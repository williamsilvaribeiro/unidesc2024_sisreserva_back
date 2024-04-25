import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadEspecialidadesByColaboradorUseCase {
  async execute({
      id
  }: IRequest) {
    try {
      const colaboadorEspecialidades = await prisma.colaboradorEspecialidade.findMany({
        where: {
          colaboradorId: id
        }
      })

      console.log(colaboadorEspecialidades)
      return colaboadorEspecialidades
    } catch (error) {
      logger.error(error)
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadEspecialidadesByColaboradorUseCase };
