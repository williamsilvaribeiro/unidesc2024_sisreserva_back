import { PrismaClient } from "@prisma/client";
import logger from "../../../../utils/logger";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

interface Colaborador {
  nome: string;
  cpf: string;
  dataDeNascimento: string;
  telefone: string;
  celular: string;
  email: string;
  cargo: string;
  curso: string;
}

class CreateColaboradorUseCase {
  async execute({
    nome,
    cpf,
    dataDeNascimento,
    telefone,
    celular,
    email,
    cargo,
    curso,
  }: Colaborador) {
    try {
      const transaction = await prisma.$transaction(async (prisma) => {
        await prisma.colaborador.create({
          data: {
            nome,
            cpf,
            dataDeNascimento,
            telefone,
            celular,
            email,
            cargo,
            curso,
          },
        });
      });
      return transaction
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError){
        if (error.meta.target === "colaborador_cpf_key"){
          return new Error("CPF já está em uso!")
        }
      }
      logger.error(error);
      return 422;
    } finally {
      await prisma.$disconnect();
    }
  }
}

export { CreateColaboradorUseCase };
