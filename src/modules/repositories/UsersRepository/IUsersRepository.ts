import User from "./models/User";
import ICreateUserDTO from "./dtos/ICreateUserDTO";

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(user_id: string): Promise<User | undefined>;
  delete(user_id: string): Promise<void>;
}