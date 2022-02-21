import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { AppError } from "@shared/errors/AppError";


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: InMemoryCarsRepository;

describe("Create Car", () => {

	beforeEach(() => {
		carsRepositoryInMemory = new InMemoryCarsRepository();
		createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
	});

	it("should be able to create a new car", async () => {
		const car = await createCarUseCase.execute({
			name: "Car1",
			description: "Carro comum",
			daily_rate: 100,
			license_plate: "ABC-1234",
			fine_amount: 50,
			brand: "VW",
			category_id: "category"
		});

		expect(car).toHaveProperty("id");
	});
   
	it("should not be able to create a car with a existent license plate", async () => { 
		expect(async () => {
			await createCarUseCase.execute({
				name: "Car1",
				description: "Carro comum",
				daily_rate: 100,
				license_plate: "ZZZ-1234",
				fine_amount: 50,
				brand: "VW",
				category_id: "category"
			});

			await createCarUseCase.execute({
				name: "Car2",
				description: "Carro comum",
				daily_rate: 100,
				license_plate: "ZZZ-1234",
				fine_amount: 50,
				brand: "VW",
				category_id: "category"
			});
		}).rejects.toBeInstanceOf(AppError);
	});
   
	it("should no be able to create a car with available as true by default", async () => {
		const car = await createCarUseCase.execute({
			name: "Car available",
			description: "Carro comum",
			daily_rate: 100,
			license_plate: "ABCD-1234",
			fine_amount: 50,
			brand: "VW",
			category_id: "category"
		});

		expect(car.available).toBe(true);
	 });
	
});