import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth";
import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();


specificationsRoutes.post("/specifications", ensureAuth, createSpecificationController.handle);

export { specificationsRoutes };