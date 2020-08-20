import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import Link from "../repositories/LinksRepository/models/Link";

interface IRequest {
  userId: string;
  url: string;
}

interface IResponse {
  id: number;
  url: string;
  hits: 0;
  shortUrl: string;
}

export default class CreateShortLinkService {
  constructor (
    private linksRepository: ILinksRepository
  ) {}
  async execute({
    url,
    userId
  }: IRequest): Promise<Link> {
    const link = await this.linksRepository.create({
      url,
      userId,
    });

    return link;
  }
}