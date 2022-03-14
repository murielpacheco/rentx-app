import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { resolve } from "path";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";



@injectable()
class SendForgotPasswordMailUseCase {
	constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("UsersTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("EtherealMailProvider")
		private mailProvier: IMailProvider
	) {}
	async execute (email: string): Promise<void> {
		const user = await this.usersRepository.findByEmail(email);

		const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

		if (!user) {
			throw new AppError("User does not exist!");
		}
      
		const token = uuidV4();
      
		const expires_in = this.dateProvider.addHours(1);
      
		await this.usersTokenRepository.create({
			refresh_token: token,
			user_id: user.id,
			expires_at: expires_in
		});

		const variables = {
			name: user.name,
			link: `${process.env.FORGOT_MAIL_URL}${token}`
		};

		await this.mailProvier.sendMail(
			email,
			"Recuperação de senha",
			variables,
			templatePath
		);
	}
}

export { SendForgotPasswordMailUseCase };