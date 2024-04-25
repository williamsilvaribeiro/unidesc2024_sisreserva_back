import { Router } from "express";

import {
  LoginController,
  RefreshTokenController
} from "../controllers/login/LoginController";


const authRoutes = Router();

const loginController = new LoginController();
const refreshTokenController = new RefreshTokenController();


// userRoutes.use(Middlewares);

authRoutes.post(
  "/",
  loginController.handle,
);

authRoutes.post(
  "/refresh",
  refreshTokenController.handle
)


export { authRoutes };
