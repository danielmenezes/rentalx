import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand: brand ? String(brand) : undefined,
      name: name ? String(name) : undefined,
      category_id: category_id ? String(category_id) : undefined,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };