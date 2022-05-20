import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

import { inject, injectable } from "tsyringe";

@injectable()
class ShowAllUsersUseCase {
	constructor(
      @inject("UsersRepository")
      private usersRepository: IUsersRepository
	) {}
	async execute () {
		const allUsers = await this.usersRepository.findAllUsers();
		return allUsers;
	}
}

export { ShowAllUsersUseCase };