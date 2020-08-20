import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import Link from "../repositories/LinksRepository/models/Link";
import { injectable, inject } from "tsyringe";

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
  }: IRequest): Promise<Link | undefined> {
    const link = await this.linksRepository.findByShortId(shortId);
    return link;
  }
}