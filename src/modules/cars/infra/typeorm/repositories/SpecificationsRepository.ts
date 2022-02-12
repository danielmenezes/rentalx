import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';
import { getRepository, Repository } from 'typeorm';

import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const epecification = await this.repository.findOne({ name });

    return epecification;
  }

  async list(): Promise<Specification[]> {
    const repositories = await this.repository.find();

    return repositories;
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.repository.findByIds(ids);

    return specifications;
  }
}

export { SpecificationsRepository };
