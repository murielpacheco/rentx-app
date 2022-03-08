import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
   user_id: string;
   car_id: string;
   expected_return_date: Date;

}

@injectable()
class CreateRentalUseCase {
	constructor(
		@inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("DayjsDateProvider")
		private dateProvider: IDateProvider,
		@inject("CarsRepository")
		private carsRepository: ICarsRepository
	) { }
   
	async execute ({ user_id ,car_id, expected_return_date }: IRequest): Promise<Rental> {
      
		const carUnavailable = await this.rentalsRepository.findCurrentRentalByCar(car_id);
      
		if (carUnavailable) {
			throw new AppError("Car is unavailable!");
		}
		const userWithRental = await this.rentalsRepository.findCurrentRentalByUser(user_id);
      
		if (userWithRental) {
			throw new AppError("User already has a rental!");
		}

		const minHoursRequired = 24;
		const currentDate = this.dateProvider.currentDate();

		const compare = this.dateProvider.compareInHours(currentDate, expected_return_date);

		if (compare < minHoursRequired) { 
			throw new AppError("The rental must have a minimum duration of 24 hours!");
		}

		const rental = await this.rentalsRepository.create({
			user_id,
			car_id,
			expected_return_date
		});

		await this.carsRepository.updateAvailable(car_id, false);
      
		return rental;
	}
}

export { CreateRentalUseCase };