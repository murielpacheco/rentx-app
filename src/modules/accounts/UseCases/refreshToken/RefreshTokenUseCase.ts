import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
	sub: string;
	email: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
      @inject("UsersTokenRepository")
		private usersTokenRepository: IUsersTokenRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}
	async execute(token: string): Promise<string> { 
		
		const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_in_days } = auth;
		const { sub, email } = verify(token, secret_refresh_token) as IPayload;
      
		const user_id = sub;
      
		const usersToken = await this.usersTokenRepository.findByUserIdAndRF(user_id, token);
      
		if (!usersToken) {
			throw new Error("Refresh Token doesn't exist!");
		}

		await this.usersTokenRepository.deleteById(usersToken.id);

		const expires_date = this.dateProvider.addDays(expires_refresh_token_in_days);


		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: sub,
			expiresIn: expires_in_refresh_token
		});

		await this.usersTokenRepository.create({
			refresh_token,
			user_id,
			expires_at: expires_date
		});

		return refresh_token;
	}
}

export { RefreshTokenUseCase };