import { Category } from "../../../entities/Category";
import { ICategoriesRepositoy } from "../../../repositories/ICategoriesRepository";

class ListAllCategoriesUseCase {
	constructor(private categoriesRepository: ICategoriesRepositoy) {}
  
	async execute(): Promise<Category[]> {
		const allCategories = await this.categoriesRepository.list();

		return allCategories;
	}

}

export { ListAllCategoriesUseCase };