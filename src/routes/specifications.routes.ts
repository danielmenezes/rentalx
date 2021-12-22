import { Router, Request, Response } from 'express';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';

const specificationsRepository = new SpecificationsRepository();

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const createSpecificationService = new CreateSpecificationService(specificationsRepository);

  try {
    createSpecificationService.execute({ name, description });
    return response.status(201).send();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
})

specificationsRoutes.get('/', (request, response) => {
  const specifications = specificationsRepository.list();
  return response.json(specifications);
});

export { specificationsRoutes };
