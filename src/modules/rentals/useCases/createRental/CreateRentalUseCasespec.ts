// import dayjs from "dayjs";

// import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
// import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
// import { AppError } from "@shared/errors/AppError";

// import { CreateRentalUseCase } from "./CreateRentalUseCase";
// import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";


// let createRentalUseCase: CreateRentalUseCase;
// let inMemoryRentalsRepository: InMemoryRentalsRepository;
// let dayjsDateProvider: DayjsDateProvider;
// let inMemoryCarsRepository: InMemoryCarsRepository;

// describe("Create Rental", () => {
// 	const dayAfter24Hours = dayjs().add(24, "hour").toDate();
// 	beforeEach(() => {
// 		inMemoryRentalsRepository = new InMemoryRentalsRepository();
// 		dayjsDateProvider = new DayjsDateProvider();
// 		inMemoryCarsRepository = new InMemoryCarsRepository();
// 		createRentalUseCase = new CreateRentalUseCase(
// 			inMemoryRentalsRepository,
// 			dayjsDateProvider,
// 			inMemoryCarsRepository);
// 	});
   
// 	it("should be able to create a new rental", async () => {
// 		const rental = await createRentalUseCase.execute({
// 			user_id: "12345",
// 			car_id: "99999",
// 			expected_return_date: dayAfter24Hours
// 		});


// 		expect(rental).toHaveProperty("id");
// 		expect(rental).toHaveProperty("start_date");
// 	});

// 	it("should no be able to create a new rental twice for the same user", async () => {
		
// 		expect(async () => {
// 			await createRentalUseCase.execute({
// 				user_id: "12345",
// 				car_id: "12313",
// 				expected_return_date: dayAfter24Hours
// 			});
			
// 			await createRentalUseCase.execute({
// 				user_id: "12345",
// 				car_id: "1321",
// 				expected_return_date: dayAfter24Hours
// 			});
// 		}).rejects.toBeInstanceOf(AppError);

// 	});

// 	it("should no be able to create a new rental twice for the same car", async () => {
		
// 		expect(async () => {
// 			await createRentalUseCase.execute({
// 				user_id: "XXXX",
// 				car_id: "99999",
// 				expected_return_date: dayAfter24Hours
// 			});
			
// 			await createRentalUseCase.execute({
// 				user_id: "YYYY",
// 				car_id: "99999",
// 				expected_return_date: dayAfter24Hours
// 			});
// 		}).rejects.toBeInstanceOf(AppError);

// 	});

// 	it("should no be able to create a new rental with less than 24 hour as expected_return_date", async () => {
		
// 		expect(async () => {
// 			await createRentalUseCase.execute({
// 				user_id: "test_hour",
// 				car_id: "test_hour",
// 				expected_return_date: dayjs().toDate()
// 			});
// 		}).rejects.toBeInstanceOf(AppError);

// 	});

// });