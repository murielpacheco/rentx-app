import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
   sub: string;
}

export async function ensureAuth(request: Request, response: Response, next: NextFunction) {
	const token = request.headers.authorization;
   
	if (!token) { 
		throw new Error("No token provided");
	}
   
	const [scheme, tokenValue] = token.split(" ");

	if (scheme !== "Bearer") {
		throw new Error("Invalid token");
	}
   
	try {
		const { sub: user_id } = verify(tokenValue, process.env.JWT_SECRETKEY) as IPayload;
      
		const usersRepository = new UsersRepository();
      
		const user = await usersRepository.findById(user_id);
      
		if (!user) {
			throw new Error("Invalid user");
		}
		next();
	} catch (error) {
		throw new Error("Invalid token");
	}

}