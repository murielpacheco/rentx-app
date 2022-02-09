import { Specification } from "../../models/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepository implements ISpecificationsRepository {
	private specifications: Specification[];

	private static INSTANCE: SpecificationRepository;

	constructor() {
		this.specifications = [];
	}

	public static getInstance(): SpecificationRepository {
		if (!SpecificationRepository.INSTANCE) {
			SpecificationRepository.INSTANCE = new SpecificationRepository();
		}

		return SpecificationRepository.INSTANCE;
	}

	create({ name, description }: ICreateSpecificationDTO): void {
		const newSpecification = new Specification;

		Object.assign(newSpecification, {
			name,
			description,
			created_at: new Date()
		});

		this.specifications.push(newSpecification);
	}

	list(): Specification[] {
		return this.specifications;
	}

	findByName(name: string): Specification {
		const category = this.specifications.find(category => category.name === name);

		return category;
	}
  
}

export { SpecificationRepository };