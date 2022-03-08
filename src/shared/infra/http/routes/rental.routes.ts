import { Router } from "express";

import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/rentals", ensureAuth, createRentalController.handle);
rentalRoutes.post("/rentals/devolution/:id", ensureAuth, devolutionRentalController.handle);

export { rentalRoutes };