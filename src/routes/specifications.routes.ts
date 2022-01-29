import { SpecificationRepository } from "./../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "./../modules/cars/services/CreateSpecificationService";
import { Router } from "express";

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationRepository();

specificationsRoutes.post("/specifications", (request, response) => {
	const { name, description } = request.body;

	const createSpecificationService = new CreateSpecificationService(specificationsRepository);

	createSpecificationService.execute({ name, description });

	return response.status(201).send();
});

specificationsRoutes.get("/specifications", (request, response) => {
	const gettingAllSpecifications = specificationsRepository.list();

	return response.json(gettingAllSpecifications);
});

export { specificationsRoutes };