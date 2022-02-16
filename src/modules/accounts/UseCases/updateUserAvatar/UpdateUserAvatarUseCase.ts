import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { deleteFile } from "@utils/file";

interface IRequest {
	user_id: string;
	avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		
		const user = await this.usersRepository.findById(user_id);

		if (user.avatar) {
			await deleteFile(`./tmp/avatar/${user.avatar}`);
		} // verificação caso o usuário tenha um avatar antigo, e deleta o mesmo

		user.avatar = avatar_file; // atualiza o avatar do usuário

		await this.usersRepository.create(user); // salva o usuário no banco de dados passando o avatar atualizado
	}
}

export { UpdateUserAvatarUseCase };