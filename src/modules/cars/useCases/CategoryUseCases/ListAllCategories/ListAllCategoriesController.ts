import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";

class ListAllCategoriesController {

	async handle(request: Request, response: Response): Promise<Response> {
		const listCategoriesUseCase = container.resolve(ListAllCategoriesUseCase);

		const gettingAllCategories = await listCategoriesUseCase.execute();
    
		return response.json(gettingAllCategories);
	}
}

export { ListAllCategoriesController };