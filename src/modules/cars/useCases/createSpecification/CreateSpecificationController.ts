import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { Request, Response } from 'express';

class CreateSpecificationController {

  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    try {
      this.createSpecificationUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController }
