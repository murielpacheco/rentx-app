import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokenRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";


let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokenRepository: InMemoryUsersTokenRepository;
let dateProvider: DayjsDateProvider;
let inMemoryMailProvider: InMemoryMailProvider;

describe("Send Forgot Password Mail", () => {

	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		inMemoryUsersTokenRepository = new InMemoryUsersTokenRepository();
		dateProvider = new DayjsDateProvider();
		inMemoryMailProvider = new InMemoryMailProvider();
		sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
			inMemoryUsersRepository,
			inMemoryUsersTokenRepository,
			dateProvider,
			inMemoryMailProvider
		);
	});

	it("should be able to send a forgot password mail to an user", async () => {
		const sendMail = jest.spyOn(inMemoryMailProvider, "sendMail");
		
		await inMemoryUsersRepository.create({
			driver_license: "132313",
			email: "test@example.com",
			name: "Test name",
			password: "123456",
		});

		await sendForgotPasswordMailUseCase.execute("test@example.com");

		expect(sendMail).toHaveBeenCalled();
	});

	it("should not be able to send a mail to a nonexistent user", async () => {
		await expect(
			sendForgotPasswordMailUseCase.execute("example@example.com")
		).rejects.toEqual(new AppError("User does not exist!"));
	});

	it("should be able to create an users token", async () => {
		const newMailToken = jest.spyOn(inMemoryUsersTokenRepository, "create");

		await inMemoryUsersRepository.create({
			driver_license: "637789",
			email: "test@test.com",
			name: "Test Name",
			password: "123456",
		});

		await sendForgotPasswordMailUseCase.execute("test@test.com");

		expect(newMailToken).toHaveBeenCalled();
	});
});