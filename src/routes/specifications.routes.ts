import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/specifications", createSpecificationController.handle);

export { specificationsRoutes };