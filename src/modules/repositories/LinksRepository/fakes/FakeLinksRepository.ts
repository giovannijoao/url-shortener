import ILinksRepository from "../ILinksRepository";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO";
import Link from "../models/Link";
import IGetStatusDTO, { IGetStatusResponse } from "../dtos/IGetStatusDTO";
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

  public async findById(id: number): Promise<Link | undefined> {
    return this.links.find(p => p.id === id);
  }

  public async save(link: Link): Promise<Link> {
    const index = this.links.findIndex(l => l.shortId === link.shortId);
    this.links[index] = link;
    return link;
  }

  public async getStats({
    userId
  }: IGetStatusDTO): Promise<IGetStatusResponse> {
    let data = [...this.links];
    if (userId) data = data.filter(d => d.userId === userId);
    const {
      hits,
      urlCount,
    } = data.reduce((a, c) => ({
      hits: a.hits + c.hits,
      urlCount: a.urlCount + 1,
    }), {
      hits: 0,
      urlCount: 0,
    });
    const topUrls = data.sort((a, b) => a.hits < b.hits ? 1 : -1).filter((_, i) => i <= 4)
    const reports: IGetStatusResponse = {
      hits,
      urlCount,
      topUrls
    }
    return reports;
  }

  public async delete(id: number): Promise<void> {
    this.links = this.links.filter(l => l.id !== id);
  }
}