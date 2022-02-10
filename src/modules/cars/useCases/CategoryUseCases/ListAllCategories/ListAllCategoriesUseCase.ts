import { Category } from "../../../entities/Category";
import { ICategoriesRepositoy } from "../../../repositories/ICategoriesRepository";

class ListAllCategoriesUseCase {
	constructor(private categoriesRepository: ICategoriesRepositoy) {}
  
	execute(): Category[] {
		const allCategories = this.categoriesRepository.list();

		return allCategories;
	}

}

export { ListAllCategoriesUseCase };