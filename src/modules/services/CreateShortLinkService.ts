import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import Link from "../repositories/LinksRepository/models/Link";
import { injectable, inject } from "tsyringe";
import { link } from "fs";

interface IRequest {
  userId: string;
  url: string;
}

@injectable()
export default class CreateShortLinkService {
  constructor (
    @inject('LinksRepository') private linksRepository: ILinksRepository
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