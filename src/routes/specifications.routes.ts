import { Router, Request, Response } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRepository = SpecificationsRepository.getInstance();

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  return createSpecificationController.handle(request, response);
})

specificationsRoutes.get('/', (request, response) => {
  const specifications = specificationsRepository.list();
  return response.json(specifications);
});

export { specificationsRoutes };
