import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Create User", () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
	});

	it("should be able to create an user", async () => {
		const user = {
			name: "Test Name",
			email: "test@test.com",
			driver_license: "123456",
			password: "123456",
		};

		await createUserUseCase.execute(user);
      
		const userCreated = await inMemoryUsersRepository.findByEmail(user.email);

		expect(userCreated).toHaveProperty("id");
   
	});
   
	it("should not be able to create an existent user", async () => {
		expect(async () => {
			const user = {
				name: "Test Name",
				email: "test@test.com",
				driver_license: "123456",
				password: "123456",
			};
         
			await createUserUseCase.execute(user);
         
			await createUserUseCase.execute(user);

		}).rejects.toBeInstanceOf(AppError);
	});
});