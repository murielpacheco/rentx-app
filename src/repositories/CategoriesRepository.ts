import { Category } from "../models/Category";
import { ICategoriesRepositoy, ICreateCategoryDTO } from "./ICategoriesRepository";



export class CategoriesRepositories implements ICategoriesRepositoy {
	private categories: Category[];

	constructor() {
		this.categories = [];
	}

	create({ name, description }: ICreateCategoryDTO) {
		const newCategory = new Category();

		Object.assign(newCategory, {
			name,
			description,
			created_at: new Date()
		});

		this.categories.push(newCategory);
	}

	list(): Category[] {
		return this.categories;
	}

	findByName(name: string): Category {
		const category = this.categories.find(category => category.name === name);

		return category;
	}

}