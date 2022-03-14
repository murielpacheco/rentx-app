import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";



@injectable()
class SendForgotPasswordMailUseCase {
	constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository,
      @inject("usersTokenRepository")
      private usersTokenRepository: IUsersTokenRepository,
      @inject("DayjsDateProvider")
      private dateProvider: IDateProvider
	) {}
	async execute (email: string) {
		const user = await this.usersRepository.findByEmail(email);
      
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
	}
}

export { SendForgotPasswordMailUseCase };