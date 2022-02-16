import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
interface ICategoryRequest {
  name: string;
  description: string;
  
}

@injectable()
class CreateCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository) {}
	
	async execute({ name, description }: ICategoryRequest): Promise<void> {

		const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) throw new AppError("Category already exists!");
  
		this.categoriesRepository.create({ name, description });
	}
  
}

export { CreateCategoryUseCase };
