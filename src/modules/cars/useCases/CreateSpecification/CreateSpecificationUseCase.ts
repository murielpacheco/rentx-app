import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ISpecificationRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
	constructor(private specificationsRepository: ISpecificationsRepository) {
    
	}
	execute({ name, description }: ISpecificationRequest): void {
    
		const specificationAlreadyExists = this.specificationsRepository.findByName(name);

		if (specificationAlreadyExists) throw new Error ("Specification Already Exists");

		const specification = this.specificationsRepository.create({ name, description });
    
		return specification;
	}
  
}

export { CreateSpecificationUseCase };