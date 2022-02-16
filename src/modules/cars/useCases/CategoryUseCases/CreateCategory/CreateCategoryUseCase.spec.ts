import { AppError } from "./../../../../../errors/AppErros";
import { InMemoryCategoriesRepository } from "../../../repositories/in-memory/InMemoryCategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
 
let createCategoryUseCase: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("Create category", () => {

	beforeEach(() => {
		inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
		createCategoryUseCase = new CreateCategoryUseCase(inMemoryCategoriesRepository);
	});

	it("should be able to create a new category", async() => {
		const category = {
			name: "Category name test",
			description: "Category description test"
		};
		await createCategoryUseCase.execute({
			name: category.name,
			description: category.description
		});

		const categoryCreated = await inMemoryCategoriesRepository.findByName(category.name);

		expect(categoryCreated).toHaveProperty("id");
	});

	it("should not be able to creating a existing category" , async() => {
		
		expect(async () => {
			const category = {
				name: "Category name test",
				description: "Category description test"
			};
			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description
			});
	
			await createCategoryUseCase.execute({
				name: category.name,
				description: category.description
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});