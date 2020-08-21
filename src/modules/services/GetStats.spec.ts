import "reflect-metadata";
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";
import GetStats from "./GetStats"
import Link from "modules/repositories/LinksRepository/models/Link";
import { report } from "process";

let fakeLinksRepository: FakeLinksRepository;
let getStats: GetStats;
const timeout = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));
describe('GetStats', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    getStats = new GetStats(fakeLinksRepository)
  })
  it('should be able to return reports from all links', async () => {
    const link1 = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user'
    });
    const link2 = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user2'
    });
    const link3 = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user3'
    });
    const link4 = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user4'
    });
    const link5 = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user5'
    });
    link5.hits = 5;
    link4.hits = 4;
    link3.hits = 3;
    link1.hits = 2;
    link2.hits = 1;
    await Promise.all([link1, link2, link3, link4, link5].map(async (link, i) => {
      await timeout(100 * i);
      fakeLinksRepository.save(link);
    }));
    const reports = await getStats.execute({});
    expect(reports.hits).toBe(15);
    expect(reports.urlCount).toBe(5);
    expect(reports.topUrls[0].shortId).toBe(link5.shortId);
    expect(reports.topUrls[4].shortId).toBe(link2.shortId);
  })
  it('should be able to return reports from all links from a specific user', async () => {
    await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user'
    });
    await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user'
    });
    await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user2'
    });
    await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user3'
    });
    const reports = await getStats.execute({
      userId: 'user'
    });
    expect(reports.urlCount).toBe(2);
    expect(reports.topUrls).toHaveLength(2);
  })
})