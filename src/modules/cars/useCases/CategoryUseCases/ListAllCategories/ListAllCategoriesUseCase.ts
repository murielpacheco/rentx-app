import { inject, injectable } from "tsyringe";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

@injectable()
class ListAllCategoriesUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) { }
  
	async execute(): Promise<Category[]> {
		const allCategories = await this.categoriesRepository.list();

		return allCategories;
	}

}

export { ListAllCategoriesUseCase };