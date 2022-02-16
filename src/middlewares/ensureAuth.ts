import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppErros";
import { UsersRepository } from "../modules/accounts/repositories/typeorm/UsersRepository";

interface IPayload {
   sub: string;
}

export async function ensureAuth(request: Request, response: Response, next: NextFunction) {
	const token = request.headers.authorization;
   
	if (!token) { 
		throw new AppError("No token provided", 401);
	}
   
	const [scheme, tokenValue] = token.split(" ");

	if (scheme !== "Bearer") {
		throw new AppError("Invalid token");
	}
   
	try {
		const { sub: user_id } = verify(tokenValue, process.env.JWT_SECRETKEY) as IPayload;
      
		const usersRepository = new UsersRepository();
      
		const user = await usersRepository.findById(user_id);
      
		if (!user) {
			throw new AppError("Invalid user", 401);
		}

		request.user = {
			id: user_id,
		};
		next();
	} catch (error) {
		throw new AppError("Invalid token!", 401 );
	}

}