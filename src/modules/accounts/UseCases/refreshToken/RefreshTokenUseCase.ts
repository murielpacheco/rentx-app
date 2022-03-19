import auth from "@config/auth";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
	sub: string;
	email: string;
}

interface ITokenResponse {
	token: string;
	refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
	constructor(
      @inject("UsersTokenRepository")
		private usersTokenRepository: IUsersTokenRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}
	async execute(token: string): Promise<ITokenResponse> { 
		
		const {
			secret_refresh_token,
			expires_in_refresh_token,
			expires_refresh_token_in_days,
			secret_token,
			expires_in_token } = auth;
		const { sub, email } = verify(token, secret_refresh_token) as IPayload;
      
		const user_id = sub;
      
		const usersToken = await this.usersTokenRepository.findByUserIdAndRF(user_id, token);
      
		if (!usersToken) {
			throw new Error("Refresh Token doesn't exist!");
		}

		await this.usersTokenRepository.deleteById(usersToken.id);

		const expires_at = this.dateProvider.addDays(expires_refresh_token_in_days);

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: sub,
			expiresIn: expires_in_refresh_token
		});

		await this.usersTokenRepository.create({
			refresh_token,
			user_id,
			expires_at
		});


		const newToken = sign({ }, secret_token, {
			subject: user_id,
			expiresIn: expires_in_token
		});

		return {
			token: newToken,
			refresh_token
		};
	}
}

export { RefreshTokenUseCase };