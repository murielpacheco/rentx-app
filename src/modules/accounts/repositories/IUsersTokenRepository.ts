import { ICreateUserTokenDTO } from "../dtos/ICreateUsersTokenDTO";
import { UsersToken } from "../infra/typeorm/entities/UserToken";


interface IUsersTokenRepository {
   create({ refresh_token, user_id, expires_at }: ICreateUserTokenDTO): Promise<UsersToken>
}

export { IUsersTokenRepository };