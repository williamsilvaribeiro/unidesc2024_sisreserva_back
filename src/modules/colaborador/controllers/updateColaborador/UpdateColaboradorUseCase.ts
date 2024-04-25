import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface Colaborador {
  id: string;
  nome: string;
  sexo: string;
  cpf: string;
  mensagem: string;
  dataDeNascimento: string;
  tipoColaborador: string;
  endereco: {
    enderecoCep: string;
    enderecoEndereco: string;
    enderecoNumero: string;
    enderecoComplemento: string;
    enderecoBairro: string;
    enderecoCidade: string;
    enderecoEstado: string;
    enderecoPais: string;
  };
  telefone: string;
  telefone2: string;
  celular: string;
  celular2: string;
  email: string;
  email2: string;
  corNaAgenda: string;
  grupoEmpresarialId: string;
  empresas: string[] | undefined;
  medicina: {
    isMedicina: boolean;
    idadeMinimaAtendimento: number;
    idadeMaximaAtendimento: number;
    corNaAgenda: string;
    anamnesePadrao: string;
    evolucaoPadrao: string;
    observacoes: string;
    conselho: {
      id: string;
      uf: string;
      registroConselho: string;
      codigo: string;
      descricao: string;
    }[];
    convenios: string[] | undefined;
    especialidades:
      | {
          id: any;
          rqe: string;
          uf: string;
          especialidadeId: string;
        }[]
      | undefined;
  };
}

class UpdateColaboradorUseCase {
  async execute({
    id,
    nome,
    sexo,
    cpf,
    mensagem,
    dataDeNascimento,
    endereco,
    telefone,
    telefone2,
    celular,
    celular2,
    email,
    email2,
    grupoEmpresarialId,
    empresas,
    medicina,
    corNaAgenda,
  }: Colaborador) {
    try {

      const colaborador = await prisma.colaborador.update({
        where: { id },
        data: {
          nome,
          cpf,
          grupoEmpresarialId,
          dataDeNascimento,
          sexo,
          ativo: true,
          telefone,
          telefone2,
          celular,
          celular2,
          email,
          email2,
          mensagem,
          corNaAgenda,
        },
      });

      await prisma.endereco.update({
        where: { id: colaborador.enderecoId },
        data: endereco,
      });

      const colaboradorEmpresasCount = await prisma.colaboradorEmpresa.count({
        where: { colaboradorId: id },
      });
      if (colaboradorEmpresasCount !== empresas.length) {
        const deleted = await prisma.colaboradorEspecialidade.deleteMany({
          where: { colaboradorId: colaborador.id },
        });

        if (deleted) {
          await prisma.colaboradorEmpresa.createMany({
            data: empresas.map((e) => {
              return {
                colaboradorId: colaborador.id,
                empresaId: e,
              };
            }),
          });
        }
      }

      const medicinaExists = await prisma.colaboradorMedicina.findUnique({
        where: { colaboradorId: id },
      });

      const especialidadeExists =
        await prisma.colaboradorEspecialidade.findMany({
          where: { colaboradorId: id },
        });

      const conselhoExists = await prisma.colaboradorConselho.findMany({
        where: { colaboradorId: id}
      })

      if (medicinaExists) {
        await prisma.colaboradorMedicina.update({
          where: { colaboradorId: colaborador.id },
          data: {
            idadeMinimaAtendimento: medicina.idadeMinimaAtendimento,
            idadeMaximaAtendimento: medicina.idadeMaximaAtendimento,
            anamnesePadrao: medicina.anamnesePadrao,
            evolucaoPadrao: medicina.evolucaoPadrao,
            observacoes: medicina.observacoes,
          },
        });
      }

      if (especialidadeExists.length === medicina.especialidades.length) {
        for(const espec of medicina.especialidades){
          const {id, uf, rqe, especialidadeId} = espec;
          await prisma.colaboradorEspecialidade.updateMany({
            where: {especialidadeId: especialidadeId},
            data: {
              rqe,
              uf,
              especialidadeId,
              colaboradorId: colaborador.id,
              grupoEmpresarialId: colaborador.grupoEmpresarialId
            }
          })
        }
      } else
          if (medicina.especialidades.length == 0 || especialidadeExists.length > medicina.especialidades.length) {
            for (let i = 0; i < medicina.especialidades.length; i++) {
                await prisma.colaboradorEspecialidade.deleteMany({
                  where: {
                    id: {
                      notIn: medicina.especialidades[i].id.id
                    }
                  },
                });
              }
              await prisma.colaboradorEspecialidade.createMany({
                data: medicina.especialidades.map((e) => {
                  return {
                    colaboradorId: colaborador.id,
                    grupoEmpresarialId: colaborador.grupoEmpresarialId,
                    especialidadeId: e.especialidadeId,
                    rqe: e.rqe,
                    uf: e.uf
                  }
                })
               });
      } else {
        for (let i = 0; i < medicina.especialidades.length; i++) {
          await prisma.colaboradorEspecialidade.createMany({
            data: {
              rqe: medicina.especialidades[i]?.rqe,
              uf: medicina.especialidades[i]?.uf,
              colaboradorId: colaborador.id,
              grupoEmpresarialId: colaborador.grupoEmpresarialId,
              especialidadeId: medicina.especialidades[i]?.especialidadeId,
            },
            skipDuplicates: true,
          });
        }
      }

      if(conselhoExists.length === medicina.conselho.length) {
        for (let i = 0; i < medicina.conselho.length; i++) {
          await prisma.colaboradorConselho.updateMany({
            where: { id: medicina.conselho[i].id[i]},
            data: {
              uf: medicina.conselho[i].uf,
              codigo: medicina.conselho[i].codigo,
              registroConselho: medicina.conselho[i].registroConselho
            }
          })
        }
      } else if (medicina.conselho.length == 0 || conselhoExists.length > medicina.conselho.length) {
        for(let i = 0; i < medicina.conselho.length; i++){
          await prisma.colaboradorConselho.deleteMany({
            where: {colaboradorId: id},
          })
        }
        await prisma.colaboradorConselho.createMany({
          data:medicina.conselho.map((e) => {
            return {
              uf: e.uf,
              codigo: e.codigo,
              registroConselho: e.registroConselho,
              colaboradorId: colaborador.id
            }
          })
        })
      } else {
        for (let i = 0; i < medicina.conselho.length; i++) {
          await prisma.colaboradorConselho.createMany({
            data: {
              uf: medicina.conselho[i].uf,
              codigo: medicina.conselho[i].codigo,
              registroConselho: medicina.conselho[i].registroConselho,
              colaboradorId: colaborador.id
            },
            skipDuplicates: true
          })

        }
      }

      return 201;
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { UpdateColaboradorUseCase };
