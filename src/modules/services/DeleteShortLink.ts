import { inject, injectable } from "tsyringe";
import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import AppError from "../../shared/errors/AppError";
import Link from "../repositories/LinksRepository/models/Link";

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteShortLink {
  constructor(
    @inject('LinksRepository') private linksRepository: ILinksRepository,
  ) {}
  async execute({
    id
  }: IRequest): Promise<void> {
    const report = await this.linksRepository.findById(id);
    if (!report) {
      throw new AppError('URL não existe.', 404);
    }
    await this.linksRepository.delete(id);
  }
}