

import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowAllUsersUseCase } from "./ShowAllUsersUseCase";


class ShowAllUsersController {
	async handle(request: Request, response: Response): Promise<Response> {
		const showAllUsersUseCase = container.resolve(ShowAllUsersUseCase);
      
		const allUsers = await showAllUsersUseCase.execute();
      
		return response.json(allUsers);
	}
}

export { ShowAllUsersController };