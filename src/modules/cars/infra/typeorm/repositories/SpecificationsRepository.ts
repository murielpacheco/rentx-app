import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import { getRepository, Repository } from "typeorm";

class SpecificationsRepository implements ISpecificationsRepository {
	private repository: Repository<Specification>;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
		const specification = this.repository.create({ name, description });

		await this.repository.save(specification);

		return specification;
	}

	async list(): Promise<Specification[]> {
		const allSpecificationsList = await this.repository.find();

		return allSpecificationsList;
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ where: { name } });
		return specification;
	}
  
	async findByIds(ids: string[]): Promise<Specification[]> {
		const allSpecifications = await this.repository.findByIds(ids);
		return allSpecifications;
	}
}

export { SpecificationsRepository };