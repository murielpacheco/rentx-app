import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListAllCategoriesController } from "./ListAllCategoriesController";
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const listAllCategoriesUseCase = new ListAllCategoriesUseCase(categoriesRepository);
const listAllCategoriesController = new ListAllCategoriesController(listAllCategoriesUseCase);

export { listAllCategoriesController };