import { inject, injectable } from "tsyringe";
import { AppError } from "@errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface ISpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
	constructor(
		@inject("SpecificationsRepository")
		private specificationsRepository: ISpecificationsRepository
	) {
    
	}
	async execute({ name, description }: ISpecificationRequest): Promise<void> {
    
		const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

		if (specificationAlreadyExists) throw new AppError ("Specification Already Exists");

		this.specificationsRepository.create({ name, description });
	}
  
}

export { CreateSpecificationUseCase };