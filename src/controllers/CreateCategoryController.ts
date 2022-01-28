// import { Request, Response } from "express";
// import { CreateCategoryService } from "../services/CreateCategoryService";

// export class CreateCategoryControllert {
// 	async handle(request: Request, response: Response) {
// 		const { name, description } = request.body;

// 		const createCategoryService = new CreateCategoryService(categoriesRepositories);

// 		const category = createCategoryService.execute({ name, description });

// 		return response.json(category);

// 	}
// }