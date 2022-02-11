import { inject, injectable } from "tsyringe";
import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

interface IImportCategory {
	name: string;
	description: string;
}
@injectable()
class ImportCategoryUseCase {
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) { }

	
	loadCategories (file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = [];
			const streamFile = fs.createReadStream(file.path);

			const parseFile = csvParse();

			streamFile.pipe(parseFile);

			parseFile.on("data", async (line) => {
				const [name, description] = line;
				categories.push({ name, description });
			}).on("end", () => {
				fs.promises.unlink(file.path);
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

			const categoryExist = await this.categoriesRepository.findByName(name);

			if (!categoryExist) {
				await this.categoriesRepository.create({ name, description });
			}
		});
	}

}

export { ImportCategoryUseCase };