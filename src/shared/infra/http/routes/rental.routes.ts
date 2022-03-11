import { Router } from "express";

import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/rentals", ensureAuth, createRentalController.handle);

rentalRoutes.post("/rentals/devolution/:id", ensureAuth, devolutionRentalController.handle);

rentalRoutes.get("/rentals/user", ensureAuth, listRentalsByUserController.handle);

export { rentalRoutes };