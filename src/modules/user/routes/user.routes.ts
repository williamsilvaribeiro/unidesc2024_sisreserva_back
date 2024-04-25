import { Router } from "express";

import authToken from "../../../middlewares/authToken";
import authPermissions from "../../../middlewares/authPermissions";

import { CreateUserController } from "../controllers/createUser/CreateUserController";
import { ReadUserController } from "../controllers/readUser/readUserController";
import { ReadUserByIdController } from "../controllers/readUserById/readUserByIdController";
import { UpdateUserController } from "../controllers/updateUser/UpdateUserController";
import { DeleteUserController } from "../controllers/deleteUser/deleteUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const readUserController = new ReadUserController();
const readUserByIdController = new ReadUserByIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

userRoutes.post("/",
authToken,
authPermissions("CREATE_USER"),
 createUserController.handle);

userRoutes.get("/",
authToken,
authPermissions("READ_USER"),
 readUserController.handle);

userRoutes.get("/:id",
authToken,
authPermissions("READ_USER"),
 readUserByIdController.handle);

userRoutes.put("/:id",
authToken,
authPermissions("UPDATE_USER"),
 updateUserController.handle);

userRoutes.delete("/:id",
authToken,
authPermissions("DELETE_USER"),
 deleteUserController.handle);

export { userRoutes };
