import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

interface Colaborador {
  nome: string;
  sexo: string;
  cpf: string;
  mensagem: string;
  dataDeNascimento: string;
  corNaAgenda: string;
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
  grupoEmpresarialId: string;
  empresas: string[] | undefined;
  medicina: {
    isMedicina: boolean;
    idadeMinimaAtendimento: number;
    idadeMaximaAtendimento: number;
    anamnesePadrao: string;
    evolucaoPadrao: string;
    observacoes: string;
    conselho: {
      uf: string;
      registroConselho: string;
      codigo: string;
    }[];
    convenios: string[] | undefined;
    especialidades:
      | {
          rqe: string;
          uf: string;
          especialidadeId: string;
        }[]
      | undefined;
  };
}

class CreateColaboradorUseCase {
  async execute({
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
      console.log(dataDeNascimento)
      const userId = uuidv4();

      let enderecoId: string = "";
      let colaboradorId: string = "";
      let colaboradorGrupoEmpresarialId: string = "";
      let colaboradores: any;

      try {
        const createdEndereco = await prisma.endereco.create({
          data: endereco,
        });

        enderecoId = createdEndereco.id;
      } catch (error) {
        return "Falha na criação de endereço!";
      }

      try {
        console.log("colaborador", medicina)
        const colaborador = await prisma.colaborador.create({
          data: {
            nome,
            cpf,
            grupoEmpresarialId,
            dataDeNascimento,
            sexo,
            ativo: true,
            enderecoId: enderecoId,
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

        colaboradorId = colaborador.id;
        colaboradorGrupoEmpresarialId = colaborador.grupoEmpresarialId;
        colaboradores = colaborador;
      } catch (error) {
        return "Falha na criação de colaborador!";
      }

      empresas &&
        (await prisma.colaboradorEmpresa.createMany({
          data: empresas.map((e) => {
            return {
              colaboradorId: colaboradorId,
              empresaId: e,
            };
          }),
        }));

      if (medicina) {
        await prisma.colaboradorMedicina.create({
          data: {
            idadeMinimaAtendimento: medicina.idadeMinimaAtendimento,
            idadeMaximaAtendimento: medicina.idadeMaximaAtendimento,
            anamnesePadrao: medicina.anamnesePadrao,
            evolucaoPadrao: medicina.evolucaoPadrao,
            observacoes: medicina.observacoes,
            colaboradorId: colaboradorId,
          },
        });

        medicina.conselho.length !== 0 &&
          (await prisma.colaboradorConselho.createMany({
            data: medicina.conselho.map((c) => {
              return {
                uf: c.uf,
                codigo: c.codigo,
                registroConselho: c.registroConselho,
                colaboradorId: colaboradorId,
              };
            }),
          }));

        medicina.especialidades.length !== 0 &&
          (await prisma.colaboradorEspecialidade.createMany({
            data: medicina.especialidades.map((c) => {
              return {
                ...c,
                colaboradorId: colaboradorId,
                grupoEmpresarialId: colaboradorGrupoEmpresarialId,
              };
            }),
          }));
      }

      return colaboradores;
    } catch (error) {
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { CreateColaboradorUseCase };
