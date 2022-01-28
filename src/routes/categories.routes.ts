import { Router } from "express";

import { CategoriesRepositories } from "../repositories/CategoriesRepositories";

const categoriesRoutes = Router();
const categoriesRepositories = new CategoriesRepositories();
categoriesRoutes.post("/categories", (request, response) => {
	const { name, description } = request.body;
	
	categoriesRepositories.create({ name, description });

	return response.status(201).send();
  
});
categoriesRoutes.get("/categories", (request, response) => {
	const gettingAllCategories = categoriesRepositories.list();

	return response.json(gettingAllCategories);
});

export { categoriesRoutes };