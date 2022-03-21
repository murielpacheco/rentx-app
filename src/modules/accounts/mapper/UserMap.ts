import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
   
	static toDTO({
		name,
		email,
		id,
		avatar,
		driver_license,
		avatar_url
	}: User): IUserResponseDTO {
		const user = instanceToInstance({
			name,
			email,
			id,
			avatar,
			driver_license,
			avatar_url
		});
		return user;
	}
}

export { UserMap };