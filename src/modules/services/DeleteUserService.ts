import { inject, injectable } from "tsyringe";
import User from "../repositories/UsersRepository/models/User";
import IUsersRepository from "../repositories/UsersRepository/IUsersRepository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  userId: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({
    userId
  }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new AppError('Usuário não existe', 400)
    }
    await this.usersRepository.delete(userId)
  }
}