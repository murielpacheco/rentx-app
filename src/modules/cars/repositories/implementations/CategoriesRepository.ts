import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepositoy, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepositoy {

	private repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category);
	}

	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			description,
			name
		});
		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const allCategoriesList = await this.repository.find();

		return allCategoriesList;
	}

	async findByName(name: string): Promise<Category> {
		const category = await this.repository.findOne({ name });

		return category;
	}
}

export { CategoriesRepository };