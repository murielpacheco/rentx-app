import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
	const { id } = request.user;
   
	const usersRepository = new UsersRepository();
	const user = await usersRepository.findById(id);
   
	if (!user) {
		throw new AppError("Invalid user", 401);
	}
   
	if (!user.isAdmin) {
		throw new AppError("User isn't an admin", 401);
	}
   
	return next();
}