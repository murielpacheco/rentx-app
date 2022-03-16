import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
   email: string;
   password: string;
}

interface IResponse { 
	user: {
		name: string;
		email: string;
	},
	token: string;
	refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
      @inject("UsersRepository")
		private usersRepository: IUsersRepository,
		@inject("UsersTokenRepository")
		private usersTokenRepository: IUsersTokenRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}
	 
	async execute ({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
		const {
			secret_token,
			expires_in_token,
			secret_refresh_token,
			expires_in_refresh_token,
			expires_refresh_token_in_days
		} = auth;
      
		if (!user) {
			throw new AppError ("Email or password invalid!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError ("Email or password invalid!");
		}

		const token = sign({ userId: user.id }, secret_token, {
			subject: user.id,
			expiresIn: expires_in_token
		});

		const refresh_token = sign({ email }, secret_refresh_token, {
			subject: user.id,
			expiresIn: expires_in_refresh_token
		});

		const expires_at = this.dateProvider.addDays(expires_refresh_token_in_days);

		await this.usersTokenRepository.create({
			refresh_token,
			user_id: user.id,
			expires_at
		});

		const tokenReturn: IResponse = {
			token,
			refresh_token,
			user: {
				name: user.name,
				email: user.email
			}
		};
		
		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };