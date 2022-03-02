import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationsRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

describe("Create Car Specification", () => {

	beforeEach(() => {
		inMemoryCarsRepository = new InMemoryCarsRepository();
		inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(inMemoryCarsRepository, inMemorySpecificationsRepository);
	});

	it("should not be able to add a new specification to an existing car", async () => {
		expect( async () => {
			const car_id = "123";
			const specifications_id = ["abc", "def"];
			await createCarSpecificationUseCase.execute({ car_id, specifications_id });
		}).rejects.toBeInstanceOf(AppError);
	});
	it("should be able to add a new specification to a car", async () => {
		const car = await inMemoryCarsRepository.create({
			name: "Car1",
			description: "Carro comum",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 50,
			brand: "VW",
			category_id: "category"
		});
      
		const specification = await inMemorySpecificationsRepository.create({
			description: "Common car",
			name: "Specification1"
		});

		const car_id = "123";
		const specifications_id = [specification.id];
      
		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id
		});

		expect(specificationsCars).toHaveProperty("specifications");
		expect(specificationsCars.specifications).toHaveLength(1);
		
	});
});