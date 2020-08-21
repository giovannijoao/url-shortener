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

  public async findByShortId(shortId: string): Promise<Link | undefined> {
    return this.links.find(p => p.shortId === shortId);
  }

  public async save(link: Link): Promise<Link> {
    const index = this.links.findIndex(l => l.shortId === link.shortId);
    this.links[index] = link;
    return link;
  }
}