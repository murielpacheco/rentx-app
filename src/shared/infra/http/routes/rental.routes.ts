import { Router } from "express";

import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/rentals", ensureAuth, createRentalController.handle);

export { rentalRoutes };