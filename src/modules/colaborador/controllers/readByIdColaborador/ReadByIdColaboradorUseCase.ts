import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";

const prisma = new PrismaClient();

interface IRequest {
  id: string;
}

class ReadByIdColaboradorUseCase {
  async execute({
      id
  }: IRequest) {
    try {
      const colaborador = await prisma.colaborador.findUnique(
        {
          where: { id },
          include: {
            ColaboradorMedicina: true,
            colaboradorConselho: true,
            colaboradorEspecialidades: true,
            colaboradorEmpresas: true
          },
      });

      const endereco = colaborador && await prisma.endereco.findUnique({ where: { id: colaborador.enderecoId } })

      const empresas = colaborador && await prisma.colaboradorEmpresa.findMany({ where: { colaboradorId: colaborador.id } })


      return  {colaborador, endereco, empresasIds: empresas.map((e) => { return e.empresaId } )}
    } catch (error) {
      logger.error(error)
      return 404;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { ReadByIdColaboradorUseCase };
