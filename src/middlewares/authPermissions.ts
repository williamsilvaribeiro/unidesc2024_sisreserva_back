import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import logger from "../utils/logger";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function authPermissions(permission: string) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const token = request.headers.authorization.replace("Bearer ", "");

      interface tipoColaborador {
        colaboradorId: string
      }

      const colaborador = jwt.decode(token.toString()) as tipoColaborador

      const permissoesColaborador = await prisma.permissoesColaborador.findMany({
        where: {
          colaboradorId: colaborador.colaboradorId
        },
        include: {
          permissao: true
        }
      })

      const hasPermission = permissoesColaborador.find(
        (p: any) => { return p.permissao.nome === permission }
      )

      if (!hasPermission) {
        return response.status(401).json({message: "usuario sem permissao"})
      }

      return next()

    } catch (error) {
      logger.error(error);
      return response.status(401).json({message: "usuario sem permissao"})
    };
  }
};
