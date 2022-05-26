import { InMemorySpecificationsRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";


let inMemorySpecificationRepository: InMemorySpecificationsRepository;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create specification", () => {
   
	beforeEach(() => {
		inMemorySpecificationRepository = new InMemorySpecificationsRepository();
		createSpecificationUseCase = new CreateSpecificationUseCase(inMemorySpecificationRepository);
	});
   
	it("should be able to create a new specification", async () => {
		const specification = {
			name: "Good car",
			description: "For good cars"
		};
      
		await createSpecificationUseCase.execute(specification);
      
		const newSpecification = await inMemorySpecificationRepository.findByName(specification.name);

		expect(newSpecification).toHaveProperty("id");
   
	});
   
	it("should not be able to create a new specification with a name that already exists", () => {
		expect(async () => {
			await createSpecificationUseCase.execute({
				description: "A very good car",
				name: "Ferrari"
			});
			await createSpecificationUseCase.execute({
				description: "A very good car",
				name: "Ferrari"
			});
		}).rejects.toBeInstanceOf(AppError);
   
	});
});