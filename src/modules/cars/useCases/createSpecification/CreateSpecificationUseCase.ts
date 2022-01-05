import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

interface IResquestDTO {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IResquestDTO): Promise<void> {
    const specificationExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationExists) {
      throw new AppError('Expecification already exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
