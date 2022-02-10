import { ICategoriesRepositoy } from "../../../repositories/ICategoriesRepository";

interface ICategoryRequest {
  name: string;
  description: string;
  
}

class CreateCategoryUseCase {
	constructor(private categoriesRepository: ICategoriesRepositoy) {}
	
	async execute({ name, description }: ICategoryRequest): Promise<void> {

		const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

		if (categoryAlreadyExists) throw new Error("Category already exists!");
  
		this.categoriesRepository.create({ name, description });
	}
  
}

export { CreateCategoryUseCase };
