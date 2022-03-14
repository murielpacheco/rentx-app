import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { rentalRoutes } from "./rental.routes";
import { passwordRoutes } from "./password.routes";


const router = Router();

router.use(categoriesRoutes);
router.use(specificationsRoutes);
router.use(usersRoutes);
router.use(authenticateRoutes);
router.use(carsRoutes);
router.use(rentalRoutes);
router.use(passwordRoutes);

export { router };