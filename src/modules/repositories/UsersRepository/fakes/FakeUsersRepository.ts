import IUsersRepository from "../IUsersRepository";
import User from "../models/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  public async create({
    id
  }: ICreateUserDTO): Promise<User> {
    const user = new User(id);
    this.users.push(user);
    return user;
  }
  public async delete(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }
  public async findById(user_id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === user_id)
  }
}