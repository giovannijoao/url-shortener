import "reflect-metadata";
import CreateShortLinkService from "./CreateShortLinkService"
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";

let fakeLinksRepository: FakeLinksRepository;
let createShortLink: CreateShortLinkService;
describe('CreateShortLink', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    createShortLink = new CreateShortLinkService(fakeLinksRepository)
  })
  it('should be able to create short link', async () => {
    const url = 'https://someurl.com';
    const userId = 'a-random-user-id';
    const linkMock = {
      id: 1,
      hits: 0,
      shortId: 'a-tiny-id',
      url,
      userId
    }
    const createLinkFunction = jest.spyOn(fakeLinksRepository, 'create').mockImplementationOnce(async () => linkMock)
    const result = await createShortLink.execute({
      userId,
      url,
    });
    expect(result).toEqual(linkMock);
    expect(createLinkFunction).toHaveBeenCalled();
  })
})