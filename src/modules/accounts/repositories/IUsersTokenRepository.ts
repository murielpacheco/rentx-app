import { ICreateUserTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokenRepository {
   create({ refresh_token, user_id, expires_at }: ICreateUserTokenDTO): Promise<UsersToken>
   findByUserIdAndRF(user_id: string, refresh_token: string): Promise<UsersToken>
   deleteById(id: string): Promise<void>
   findByRefreshToken(token: string): Promise<UsersToken>
}


export { IUsersTokenRepository };