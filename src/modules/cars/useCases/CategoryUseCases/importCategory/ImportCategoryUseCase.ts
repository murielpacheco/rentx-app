import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepositoy } from "../../../repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}

class ImportCategoryUseCase {
	constructor (private categoriesRepository: ICategoriesRepositoy) {}

	
	loadCategories (file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = [];
			const streamFile = fs.createReadStream(file.path);

			const parseFile = csvParse();

			streamFile.pipe(parseFile);

			parseFile.on("data", async (line) => {
			// ["name", "description"]	
				const [name, description] = line;
				categories.push({ name, description });
			}).on("end", () => {
				resolve(categories);
			}).on("error", (err) => {
				reject(err);
			});
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);
		
		categories.map(async (category) => {
			const { name, description } = category;

			const categoryExist = this.categoriesRepository.findByName(name);

			if (!categoryExist) {
				this.categoriesRepository.create({ name, description });
			}
		});
	}

}

export { ImportCategoryUseCase };