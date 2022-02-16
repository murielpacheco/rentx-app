import { container } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/repositories/typeorm/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/typeorm/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/repositories/typeorm/UsersRepository";

container.registerSingleton<ICategoriesRepository>(
	"CategoriesRepository",
	CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
	"SpecificationsRepository",
	SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
	"UsersRepository",
	UsersRepository
);