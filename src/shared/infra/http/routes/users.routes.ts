import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/UseCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/users", createUserController.handle);

usersRoutes.patch("/users/avatar", ensureAuth, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };