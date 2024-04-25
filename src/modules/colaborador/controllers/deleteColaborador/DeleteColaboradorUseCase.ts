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
      const colaborador = await prisma.colaborador.update({ where: { id }, data: { ativo: false }})

      if (colaborador) {
        await prisma.colaboradorEspecialidade.updateMany({ where: { colaboradorId: id }, data: { ativo: false } })
        await prisma.colaboradorConselho.updateMany({ where: { colaboradorId: id }, data: { ativo: false } })
        await prisma.colaboradorMedicina.updateMany({ where: { colaboradorId: id }, data: { ativo: false } })
        await prisma.colaboradorEmpresa.updateMany({ where: { colaboradorId: id }, data: { ativo: false } })
      } else {
        throw new Error("Colaborador not found.")
      }

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
