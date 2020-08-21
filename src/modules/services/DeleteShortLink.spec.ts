import "reflect-metadata";
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";
import DeleteShortLink from "./DeleteShortLink"
import AppError from "../../shared/errors/AppError";

let fakeLinksRepository: FakeLinksRepository;
let deleteShortLink: DeleteShortLink;
describe('DeleteShortLink', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    deleteShortLink = new DeleteShortLink(fakeLinksRepository)
  })
  it('should be able to delete a link using id', async () => {
    const url = 'https://some-url.com';
    const { id } = await fakeLinksRepository.create({
      url,
      userId: 'user'
    });
    await deleteShortLink.execute({
      id
    });
  })
  it('should be able to delete a link if link does not exists', async () => {
    await expect(deleteShortLink.execute({
      id: 1
    })).rejects.toBeInstanceOf(AppError);
  })
})