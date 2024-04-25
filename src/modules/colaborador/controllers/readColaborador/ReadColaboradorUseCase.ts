import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadColaboradorUseCase {
  async execute({ id }: IRequest) {
    try {
      const colaboradores = await prisma.colaborador.findMany({
        where: { ativo: true },
        include: {
          ColaboradorMedicina: true,
          colaboradorConselho: true,
          colaboradorEspecialidades: true,
          colaboradorEmpresas: true,
        },
      });

      return colaboradores;
    } catch (error) {
      logger.error(error);
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadColaboradorUseCase };
