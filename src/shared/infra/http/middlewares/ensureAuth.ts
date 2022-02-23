import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
	sub: string;
 }
 
export async function ensureAuth(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const authHeader = request.headers.authorization;
 
	if (!authHeader) {
	  throw new AppError("Token missing", 401);
	}
 
	const [, token] = authHeader.split(" ");
 
	try {
	  const { sub: user_id } = verify(token, "lolalwleleel") as IPayload;
 
	  request.user = {
		 id: user_id,
	  };
 
	  return next();
	} catch {
	  throw new AppError("Invalid token!", 401);
	}
}