import { Router } from "express";

import { CategoriesRepositories } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepositories = new CategoriesRepositories();
categoriesRoutes.post("/categories", (request, response) => {
	const { name, description } = request.body;

	const createCategoryService = new CreateCategoryService(categoriesRepositories);

	const category = createCategoryService.execute({ name, description });

	return response.json(category);
});
categoriesRoutes.get("/categories", (request, response) => {
	const gettingAllCategories = categoriesRepositories.list();

	return response.json(gettingAllCategories);
});

export { categoriesRoutes };

