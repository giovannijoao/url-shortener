import "reflect-metadata";
import CreateUserService from "./CreateUserService"
import FakeUsersRepository from "../repositories/UsersRepository/fakes/FakeUsersRepository";
import AppError from "../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository)
  })
  it('should be able to create an user', async () => {
    const createUserFunction = jest.spyOn(fakeUsersRepository, 'create');
    const result = await createUser.execute({
      userId: 'user'
    });
    expect(result.id).toEqual('user');
    expect(createUserFunction).toHaveBeenCalled();
  })
  it('should not be able to create an user with same id', async () => {
    await createUser.execute({
      userId: 'user'
    });
    await expect(createUser.execute({
      userId: 'user'
    })).rejects.toBeInstanceOf(AppError);
  })
})