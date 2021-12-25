import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import fs from 'fs';
import { parse } from 'csv-parse';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) { }

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {

    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parser = parse();

      stream.pipe(parser)

      parser.on("data", async (line) => {
        const [name, description] = line;
        categories.push({ name, description });
      }).on("end", () => {
        fs.promises.unlink(file.path); // apaga arquivo csv após a importação
        resolve(categories);
      }).on('error', (err) => {
        reject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(category => {
      const categoryAlreadyExists = this.categoriesRepository.findByName(category.name);

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create(category);
      }
    })
  }

}

export { ImportCategoryUseCase }
