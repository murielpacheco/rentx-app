import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/UseCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { InMemoryUsersTokenRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepository: InMemoryUsersTokenRepository;
// let dayJsDateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

	beforeEach(() => { 
		inMemoryUsersRepository = new InMemoryUsersRepository();
		authenticateUserUseCase = new AuthenticateUserUseCase(
			inMemoryUsersRepository,
			usersTokenRepository,
			null
		);
		createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
	});

	it("should be able to authenticate an user", async () => {
		const user: ICreateUserDTO = {
			name: "User test",
			email: "user@test.com",
			password: "12345",
			driver_license: "102030",
		};
      
		await createUserUseCase.execute(user);
      
		const result = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password
		});
      
		expect(result).toHaveProperty("token");
	});

	it("should not be able to authenticate a non-existing user", async () => {
		expect(async() => {
			await authenticateUserUseCase.execute({
				email: "test@email.com",
				password: "abcd"
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it("should not be able to authenticate with an incorrect password", async () => { 
		expect(async () => {
			const user: ICreateUserDTO = {
				name: "User test",
				email: "user@test.com",
				password: "12345",
				driver_license: "102030",
			};

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: "incorrectPassword"
			}
			);
		}).rejects.toBeInstanceOf(AppError);
	});
});