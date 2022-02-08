// import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListAllCategoriesController } from "./ListAllCategoriesController";
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

const categoriesRepository = null;
const listAllCategoriesUseCase = new ListAllCategoriesUseCase(categoriesRepository);
const listAllCategoriesController = new ListAllCategoriesController(listAllCategoriesUseCase);

export { listAllCategoriesController };