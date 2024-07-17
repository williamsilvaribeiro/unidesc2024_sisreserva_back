import { Router } from "express";

import authToken from "../../../middlewares/authToken";
import authPermissions from "../../../middlewares/authPermissions";
import { CreateCalendarioController } from "../controllers/createCalendario/CreateCalendarioController";
import { DeleteCalendarioController } from "../controllers/deleteCalendario/DeleteCalendarioController";
import { ReadByIdCalendarioController } from "../controllers/readByIdCalendario/ReadByIdCalendarioController";
import { ReadCalendarioController } from "../controllers/readCalendario/ReadCalendarioController";
import { UpdateCalendarioController } from "../controllers/updateCalendario/UpdateCalendarioController";


const calendarioRoutes = Router();

const createCalendarioController = new CreateCalendarioController();
const deleteCalendarioController = new DeleteCalendarioController();
const readByIdCalendarioController = new ReadByIdCalendarioController();
const readCalendarioController = new ReadCalendarioController();
const updateCalendarioController = new UpdateCalendarioController();

calendarioRoutes.post(
  "/",
  authToken,
  // authPermissions("CREATE_COLABORADOR"),
  createCalendarioController.handle,
);

calendarioRoutes.get(
  "/",
  authToken,
  // authPermissions("READ_COLABORADOR"),
  readCalendarioController.handle,
);

calendarioRoutes.delete(
  "/:id",
  authToken,
  // authPermissions("DELETE_COLABORADOR"),
  deleteCalendarioController.handle,
);

calendarioRoutes.put(
  "/:id",
  authToken,
  // authPermissions("UPDATE_COLABORADOR"),
  updateCalendarioController.handle,
);

calendarioRoutes.get(
  "/:id",
  authToken,
  // authPermissions("READ_COLABORADOR"),
  readByIdCalendarioController.handle,
);



export { calendarioRoutes };
