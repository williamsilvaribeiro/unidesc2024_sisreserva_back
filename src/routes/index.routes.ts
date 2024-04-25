import { Router } from "express";

import { userRoutes } from "../modules/user/routes/user.routes";
import { authRoutes } from "../auth/routes/auth.routes";
import { colaboradorRoutes } from "../modules/colaborador/routes/colaboador.routes";

const router = Router();

router.use("/api/sessions", authRoutes);

router.use("/api/users", userRoutes);
router.use("/api/colaborador", colaboradorRoutes);

export { router };
