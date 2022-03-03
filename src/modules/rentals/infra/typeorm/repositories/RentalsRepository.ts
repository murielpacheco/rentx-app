import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

import { getRepository, Repository } from "typeorm";


class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = getRepository(Rental);
	}

	async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create({
			car_id,
			user_id,
			expected_return_date
		});

		await this.repository.save(rental);

		return rental;
	}

	async findCurrentRentalByCar(car_id: string): Promise<Rental> {
		return await this.repository.findOne({ car_id });
	}

	async findCurrentRentalByUser(user_id: string): Promise<Rental> {
		return await this.repository.findOne({ user_id });
	}

}

export { RentalsRepository };