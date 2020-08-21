import { inject, injectable } from "tsyringe";
import User from "../../modules/repositories/UsersRepository/models/User";
import IUsersRepository from "../../modules/repositories/UsersRepository/IUsersRepository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  userId: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({
    userId
  }: IRequest): Promise<User> {
    const existingUser = await this.usersRepository.findById(userId);
    if (existingUser) {
      throw new AppError('Usuário já existe', 409)
    }
    const user = await this.usersRepository.create({
      id: userId
    });
    return user;
  }
}