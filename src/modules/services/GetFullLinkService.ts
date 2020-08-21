import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import Link from "../repositories/LinksRepository/models/Link";
import { injectable, inject } from "tsyringe";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  shortId: string;
}

@injectable()
export default class GetFullLinkService {
  constructor (
    @inject('LinksRepository') private linksRepository: ILinksRepository
  ) {}
  async execute({
    shortId,
  }: IRequest): Promise<Link> {
    const link = await this.linksRepository.findByShortId(shortId);
    if (!link) {
      throw new AppError('Url não encontrada', 404);
    }
    link.hits++;
    await this.linksRepository.save(link);
    return link;
  }
}