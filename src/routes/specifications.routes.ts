import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";

const specificationsRoutes = Router();


specificationsRoutes.post("/specifications", (request, response) => {
	return createSpecificationController.handle(request, response);
} );

export { specificationsRoutes };