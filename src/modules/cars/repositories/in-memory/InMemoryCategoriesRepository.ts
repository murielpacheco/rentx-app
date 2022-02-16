import { Category } from "@modules/cars/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class InMemoryCategoriesRepository implements ICategoriesRepository {

	categories: Category[] = [];
   
	async findByName(name: string): Promise<Category> {
		const category = this.categories.find(category => category.name === name);
		return category;
	}
	async list(): Promise<Category[]> {
		const allCategories = this.categories;
		return allCategories;
	}
	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = new Category();
      
		category.name = name;
		category.description = description;

		this.categories.push(category);
	}

}

export { InMemoryCategoriesRepository };