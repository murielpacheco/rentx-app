import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";
import { CreateUserController } from "@modules/accounts/UseCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/UseCases/updateUserAvatar/UpdateUserAvatarController";
import { ProfileUserController } from "@modules/accounts/UseCases/profileUser/ProfileUserController";
import { ShowAllUsersController } from "@modules/accounts/UseCases/showAllUsers/ShowAllUsersController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserControlelr = new ProfileUserController();
const showAllUsersController = new ShowAllUsersController();

usersRoutes.post("/users", createUserController.handle);

usersRoutes.patch("/users/avatar", ensureAuth, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

usersRoutes.get("/users/profile/:id", ensureAuth, profileUserControlelr.handle);
usersRoutes.get("/users", showAllUsersController.handle);

export { usersRoutes };