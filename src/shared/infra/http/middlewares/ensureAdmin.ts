import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const { email } = request.body;

	const usersRepository = new UsersRepository();
	const user = await usersRepository.findById(email);

	if (user.isAdmin === false || user.isAdmin === null) {
		throw new AppError("User isn't admin!");
	}

	return next();
}