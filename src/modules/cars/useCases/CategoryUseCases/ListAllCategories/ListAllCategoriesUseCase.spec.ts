import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoriesRepository";
import { ListAllCategoriesUseCase } from "./ListAllCategoriesUseCase";


let listAllCategoriesUseCase: ListAllCategoriesUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe("List all categories", () => {
   
	beforeEach(() => {
		inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
		listAllCategoriesUseCase = new ListAllCategoriesUseCase(inMemoryCategoriesRepository);
	});
   
	it("list all categories existent", () => {
		const allCategories = listAllCategoriesUseCase.execute();

		return expect(allCategories).resolves.toBeInstanceOf(Array);
	});
});