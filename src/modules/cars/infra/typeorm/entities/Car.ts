import { Entity,PrimaryColumn, Column, CreateDateColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "./Category";
import { Specification } from "./Specification";


@Entity("cars")
class Car {
	@PrimaryColumn()
		id: string;
   
	@Column()
		name: string;

	@Column()
		description: string;
   
	@Column()
		daily_rate: number;
   
	@Column()
		available: boolean;
   
	@Column()
		license_plate: string;

	@Column()
		fine_amount: number;

	@Column()
		brand: string;
		
	@JoinColumn({ name: "category_id" })
	@ManyToOne(() => Category)
		categoryId: Category;

	@Column()
		category_id: string;
	
	@ManyToMany(() => Specification)
	@JoinTable({
		name: "specification_cars",
		joinColumn: { name: "car_id" },
		inverseJoinColumn: { name: "specification_id" }
	})
		specifications: Specification[];

	@CreateDateColumn()
		created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuidv4();
			this.available = true;
		}
	}
   
}

export { Car };
