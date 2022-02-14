import { IUsersRepository } from "../../repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

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
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository) { }
   
	async execute ({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(email);
      
		if (!user) {
			throw new Error ("Email or password invalid!");
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error ("Email or password invalid!");
		}

		const token = sign({ userId: user.id }, "149e0f3ecae8d01f2886f66c26d90429", {
			subject: user.id,
			expiresIn: "1d"
		});

		const tokenReturn: IResponse = {
			token,
			user: {
				name: user.name,
				email: user.email
			}
		};
		
		return tokenReturn;
	}
}

export { AuthenticateUserUseCase };