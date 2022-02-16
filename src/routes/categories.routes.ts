import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/CategoryUseCases/CreateCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/CategoryUseCases/importCategory/ImportCategoryController";
import { ListAllCategoriesController } from "../modules/cars/useCases/ListAllCategories/ListAllCategoriesController";



const categoriesRoutes = Router();

const upload = multer({
	dest:"./tmp"
});

//Routes

const createCategoryController = new CreateCategoryController();
const listAllCategoriesController = new ListAllCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/categories", createCategoryController.handle);

categoriesRoutes.get("/categories", listAllCategoriesController.handle);

categoriesRoutes.post("/categories/import", upload.single("file"), importCategoryController.handle);


export { categoriesRoutes };

