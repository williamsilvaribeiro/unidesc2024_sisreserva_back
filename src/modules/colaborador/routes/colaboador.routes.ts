import { Router } from "express";

import authToken from "../../../middlewares/authToken";
import authPermissions from "../../../middlewares/authPermissions";

import { CreateColaboradorController } from "../controllers/createColaborador/CreateColaboradorController";
import { ReadColaboradorController } from "../controllers/readColaborador/ReadColaboradorController";
import { DeleteColaboradorController } from "../controllers/deleteColaborador/DeleteColaboradorController";
import { UpdateColaboradorController } from "../controllers/updateColaborador/UpdateColaboradorController";
import { ReadByIdColaboradorController } from "../controllers/readByIdColaborador/ReadByIdColaboradorController";
import { ReadEspecialidadesByColaboradorController } from "../controllers/readEspecialidadesByColaborador/ReadEspecialidadesByColaboradorController";

const colaboradorRoutes = Router();

const createColaboradorController = new CreateColaboradorController();
const readColaboradorController = new ReadColaboradorController();
const deleteColaboradorController = new DeleteColaboradorController();
const updateColaboradorController = new UpdateColaboradorController();
const readByIdColaboradorController = new ReadByIdColaboradorController();
const readEspecialidadesByColaboradorController = new ReadEspecialidadesByColaboradorController();

colaboradorRoutes.post(
  "/",
  authToken,
  // authPermissions("CREATE_COLABORADOR"),
  createColaboradorController.handle,
);

colaboradorRoutes.get(
  "/",
  authToken,
  // authPermissions("READ_COLABORADOR"),
  readColaboradorController.handle,
);

colaboradorRoutes.delete(
  "/:id",
  authToken,
  // authPermissions("DELETE_COLABORADOR"),
  deleteColaboradorController.handle,
);

colaboradorRoutes.put(
  "/:id",
  authToken,
  // authPermissions("UPDATE_COLABORADOR"),
  updateColaboradorController.handle,
);

colaboradorRoutes.get(
  "/:id",
  authToken,
  // authPermissions("READ_COLABORADOR"),
  readByIdColaboradorController.handle,
);

colaboradorRoutes.get(
  "/:id/especialidades",
  authToken,
  // authPermissions("READ_COLABORADOR"),
  readEspecialidadesByColaboradorController.handle,
);


export { colaboradorRoutes };
