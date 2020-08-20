import ILinksRepository from "../ILinksRepository";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO";
import Link from "../models/Link";
export default class FakeLinksRepository implements ILinksRepository {
  private links: Link[] = [];

  public async create({
    url,
    userId,
  }: ICreateLinkDTO): Promise<Link> {
    const id = Math.random();
    const link = new Link({
      id,
      hits: 0,
      url,
      userId,
    })
    this.links.push(link);
    return link;
  }
}