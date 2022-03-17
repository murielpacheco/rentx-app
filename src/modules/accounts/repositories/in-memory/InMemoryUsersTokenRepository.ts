import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUsersTokenDTO";
import { UsersToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";


class InMemoryUsersTokenRepository implements IUsersTokenRepository {
	usersToken: UsersToken[] = [];

	async create({ refresh_token, user_id, expires_at }: ICreateUserTokenDTO): Promise<UsersToken>{
		const userToken = new UsersToken();

		Object.assign(userToken, {
			refresh_token,
			user_id,
			expires_at
		});

		this.usersToken.push(userToken);

		return userToken;
	}
	async findByUserIdAndRF(user_id: string, refresh_token: string): Promise<UsersToken> {
		return this.usersToken.find(ut => ut.user_id === user_id && ut.refresh_token === refresh_token);

	}
	async deleteById(id: string): Promise<void> {
		this.usersToken.filter(ut => ut.id !== id);
	}
	async findByRefreshToken(token: string): Promise<UsersToken> {
		return this.usersToken.find(ut => ut.refresh_token === token);
	}
   
}

export { InMemoryUsersTokenRepository };