import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";



interface ICarsRepository {
   create(car: ICreateCarDTO): Promise<Car>;
   findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository };