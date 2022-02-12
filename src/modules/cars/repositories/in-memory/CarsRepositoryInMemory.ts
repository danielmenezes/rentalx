import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create({
    name,
    brand,
    description,
    category_id,
    daily_rate,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      description,
      category_id,
      daily_rate,
      fine_amount,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id: string,
    brand: string,
    name: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (category_id || brand || name) {
        return (
          car.available &&
          ((category_id && category_id === car.category_id) ||
            (brand && brand === car.brand) ||
            (name && name === car.name))
        );
      }

      return car.available;
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }
}

export { CarsRepositoryInMemory };
