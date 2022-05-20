import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { ShowAllUsersController } from "@modules/accounts/useCases/showAllUsers/ShowAllUsersController";

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