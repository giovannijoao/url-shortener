import "reflect-metadata";
import CreateShortLinkService from "./CreateShortLinkService"
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";
import FakeUsersRepository from "../repositories/UsersRepository/fakes/FakeUsersRepository";
import AppError from "../../shared/errors/AppError";

let fakeLinksRepository: FakeLinksRepository;
let fakeUsersRepository: FakeUsersRepository;
let createShortLink: CreateShortLinkService;
describe('CreateShortLink', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createShortLink = new CreateShortLinkService(fakeLinksRepository, fakeUsersRepository)
  })
  it('should be able to create short link', async () => {
    const userId = 'a-random-user-id';
    await fakeUsersRepository.create({
      id: userId
    });
    const url = 'https://someurl.com';
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
  it('should be able to create short link if user does not exists', async () => {
    const url = 'https://someurl.com';
    const userId = 'a-random-user-id';
    await expect(createShortLink.execute({
      userId,
      url,
    })).rejects.toBeInstanceOf(AppError);
  })
})