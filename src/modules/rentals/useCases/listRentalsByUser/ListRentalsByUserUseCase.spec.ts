import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

let listRentalsByUserUseCase: ListRentalsByUserUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;

describe("List Rentals By User", () => {

	beforeEach(() => {
		inMemoryRentalsRepository = new InMemoryRentalsRepository();
		listRentalsByUserUseCase = new ListRentalsByUserUseCase(inMemoryRentalsRepository);
	});

	it("should be able to show all rentals by user", async () => {
		const user_id = "12345";
		await listRentalsByUserUseCase.execute(user_id);
	}); 
}
);