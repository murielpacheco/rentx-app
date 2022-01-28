import { Category } from "../models/Category";
import { ICategoriesRepositoy, ICreateCategoryDTO } from "./ICategoriesRepository";


export class PostgressCategoriesRepository implements ICategoriesRepositoy {
	findByName(name: string): Category {
		console.log(name);
		return null;
	}
	list(): Category[] {
		return null;
	}
	create({ name, description }: ICreateCategoryDTO): void {
		console.log(name, description);
	}

}
