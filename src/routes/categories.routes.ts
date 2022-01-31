import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/CreateCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listAllCategoriesController } from "../modules/cars/useCases/ListAllCategories";


const categoriesRoutes = Router();

const upload = multer({
	dest:"./tmp"
});

//Routes
categoriesRoutes.post("/categories", (request, response) => {
	return createCategoryController.handle(request, response);
});

categoriesRoutes.get("/categories", (request, response) => {
	listAllCategoriesController.handle(request, response);
});

categoriesRoutes.post("/categories/import", upload.single("file"), (request, response) => {
	return importCategoryController.handle(request, response);
});


export { categoriesRoutes };

