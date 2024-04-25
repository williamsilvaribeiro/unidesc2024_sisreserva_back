import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

import logger from "../utils/logger";
import auth from "../auth/config/auth";

export default function authToken(
  request: Request,
  response: Response,
  next: NextFunction) {
    try {
      const token = request.headers.authorization?.replace("Bearer ", "") ?? ""
      const secret = auth.secret_access

      if (token === undefined) {
        return response.status(401)
          .send({ message: "Missing Token." })
          .end();
      };

      jwt.verify(token, secret, (err) => {
        if (err) {

          return response.status(401)
            .send({ message: "Invalid Token." })
            .end();
        }
        return next();
      });
    } catch (error) {
      logger.error(error);
      return response.status(401)
        .send({ message: error.message })
        .end();
    };
};
