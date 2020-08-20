import "reflect-metadata";
import GetFullLinkService from "./GetFullLinkService"
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";

let fakeLinksRepository: FakeLinksRepository;
let getFullLink: GetFullLinkService;
describe('GetFullLink', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    getFullLink = new GetFullLinkService(fakeLinksRepository)
  })
  it('should be able to return link with same short id', async () => {
    const link = await fakeLinksRepository.create({
      url: 'https://some-url.com',
      userId: 'user'
    });
    const result = await getFullLink.execute({
      shortId: link.shortId,
    });
    expect(result?.url).toBe('https://some-url.com');
    expect(result?.shortId).toBe(link.shortId);
  })
})