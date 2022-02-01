import { ICategoriesRepositoy } from "../../../repositories/ICategoriesRepository";

interface ICategoryRequest {
  name: string;
  description: string;
  
}

class CreateCategoryUseCase {
	constructor(private categoriesRepository: ICategoriesRepositoy) {}
	
	execute({ name, description }: ICategoryRequest): void {

		const categoryAlreadyExists = this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) throw new Error("Category already exists!");
  
		const category = this.categoriesRepository.create({ name, description });

		return category;
	}
  
}

export { CreateCategoryUseCase };
