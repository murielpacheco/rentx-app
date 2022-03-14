import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { UsersToken } from "../entities/UserToken";


class UsersTokenRepository implements IUsersTokenRepository {
	private repository: Repository<UsersToken>;
   
	constructor() {
		this.repository = getRepository(UsersToken);
	}

	async create({ refresh_token, user_id, expires_at }: ICreateUserTokenDTO): Promise<UsersToken> {
		const userToken = this.repository.create({
			refresh_token,
			user_id,
			expires_at
		});
      
		await this.repository.save(userToken);
      
		return userToken;
	}

	async findByUserIdAndRF(user_id: string, refresh_token: string): Promise<UsersToken> {
		const usersTokens = await this.repository.findOne({ user_id, refresh_token });
		return usersTokens;
	}

	async deleteById(id: string): Promise<void> {
		await this.repository.delete(id);
	}

	async findByRefreshToken(refresh_token: string): Promise<UsersToken> {
		const usersToken = await this.repository.findOne({ refresh_token });
		return usersToken;
	}

}

export { UsersTokenRepository };