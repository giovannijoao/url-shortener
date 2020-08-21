import "reflect-metadata";
import DeleteUserService from "./DeleteUserService"
import FakeUsersRepository from "../repositories/UsersRepository/fakes/FakeUsersRepository";
import AppError from "../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;
describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUser = new DeleteUserService(fakeUsersRepository)
  })
  it('should be able to delete an user', async () => {
    await fakeUsersRepository.create({
      id: 'user',
    })
    await deleteUser.execute({
      userId: 'user'
    });
  })
  it('should not be able to delete a non-existing user', async () => {
    await expect(deleteUser.execute({
      userId: 'user'
    })).rejects.toBeInstanceOf(AppError);
  })
})