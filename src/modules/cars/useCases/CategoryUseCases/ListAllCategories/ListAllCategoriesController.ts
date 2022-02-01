import { Request, Response } from "express";
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

class ListAllCategoriesController {
	constructor(private listCategoriesUseCase: ListAllCategoriesUseCase) {}

	handle(request: Request, response: Response): Response {
		const gettingAllCategories = this.listCategoriesUseCase.execute();
    
		return response.json(gettingAllCategories);
	}
}

export { ListAllCategoriesController };