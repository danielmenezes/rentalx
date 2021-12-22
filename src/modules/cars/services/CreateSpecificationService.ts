import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IResquestDTO {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(private specificationRepository: ISpecificationsRepository) { }

  execute({ name, description }: IResquestDTO) {
    const specificationExists = this.specificationRepository.findByName(name);

    if (specificationExists) {
      throw new Error('Expecification already exists');
    }

    this.specificationRepository.create({ name, description });
  }

}

export { CreateSpecificationService };
