import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { listAllCategoriesController } from "../modules/cars/useCases/ListAllCategories";


const categoriesRoutes = Router();

//Routes
categoriesRoutes.post("/categories", (request, response) => {
	return createCategoryController.handle(request, response);
});
categoriesRoutes.get("/categories", (request, response) => {
	listAllCategoriesController.handle(request, response);
});

export { categoriesRoutes };

