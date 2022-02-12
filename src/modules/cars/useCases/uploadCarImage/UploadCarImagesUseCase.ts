import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository
  ) {}
  async axecute({ car_id, images_name }: IRequest): Promise<void> {
    // eslint-disable-next-line no-restricted-syntax
    for (const image_name of images_name) {
      // eslint-disable-next-line no-await-in-loop
      await this.carImagesRepository.create(car_id, image_name);
    }
  }
}

export { UploadCarImagesUseCase };
