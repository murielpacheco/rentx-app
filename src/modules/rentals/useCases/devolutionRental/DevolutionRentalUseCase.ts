import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

@injectable()
class DevolutionRentalUseCase {
	constructor(
      @inject("RentalsRepository")
		private rentalsRepository: IRentalsRepository,
		@inject("CarsRepository")
      private carsRepository: ICarsRepository,
      @inject("DayjsDateProvider")
		private dateProvider: IDateProvider
	) {}
	async execute (id: string): Promise<Rental> {
		const rental = await this.rentalsRepository.findById(id);
		const car = await this.carsRepository.findById(rental.car_id);

		const minDaily = 1;
      
		if (!rental) {
			throw new Error("Rental not found");
		}
      
		const currentDate = this.dateProvider.currentDate();
		let dailys = this.dateProvider.compareInDays(rental.start_date, currentDate);
      
		if (dailys <= 0) {
			dailys = minDaily;
		}
      
		const delayInDays = this.dateProvider.compareInDays(currentDate, rental.expected_return_date);
      
		let totalFine = 0;
      
		if (delayInDays > 0) {
			const calculate_fine = delayInDays * car.fine_amount;
			totalFine = calculate_fine;
		}
      
		totalFine += dailys * car.daily_rate;

		rental.end_date = this.dateProvider.currentDate();
		rental.total = totalFine;

		const rentalUpdated = await this.rentalsRepository.create(rental);
		const carsAvailableUpdated = await this.carsRepository.updateAvailable(car.id, true);
      
		return rental;
	}
}

export { DevolutionRentalUseCase };