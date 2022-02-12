import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Shold be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 68,
      brand: 'BRAND',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Shold be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 68,
      brand: 'BRAND',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'BRAND',
    });

    expect(cars).toEqual([car]);
  });

  it('Shold be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 68,
      brand: 'BRAND',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car1',
    });

    expect(cars).toEqual([car]);
  });

  it('Shold be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 68,
      brand: 'BRAND',
      category_id: 'category',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'category',
    });

    expect(cars).toEqual([car]);
  });
});
