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

}

export { UsersTokenRepository };