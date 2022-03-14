import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/UseCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetUserPasswordController } from "@modules/accounts/UseCases/resetUserPassword/ResetUserPasswordController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/password/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/password/reset", resetUserPasswordController.handle);

export { passwordRoutes };