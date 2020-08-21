import "reflect-metadata";
import FakeLinksRepository from "../repositories/LinksRepository/fakes/FakeLinksRepository";
import GetStatsByID from "./GetStatsByID"
import AppError from "../../shared/errors/AppError";

let fakeLinksRepository: FakeLinksRepository;
let getStatsByID: GetStatsByID;
describe('GetStatsByID', () => {
  beforeEach(() => {
    fakeLinksRepository = new FakeLinksRepository();
    getStatsByID = new GetStatsByID(fakeLinksRepository)
  })
  it('should be able to return report from a specific id', async () => {
    const url = 'https://some-url.com';
    const { id } = await fakeLinksRepository.create({
      url,
      userId: 'user'
    });
    const report = await getStatsByID.execute({
      id
    });
    expect(report.url).toBe(url)
  })
  it('should not be able to return report if requested id does not exists', async () => {
    await expect(getStatsByID.execute({
      id: 1
    })).rejects.toBeInstanceOf(AppError);
  })
})