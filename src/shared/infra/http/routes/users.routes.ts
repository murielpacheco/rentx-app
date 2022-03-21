import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/users", createUserController.handle);

usersRoutes.patch("/users/avatar", ensureAuth, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRoutes };