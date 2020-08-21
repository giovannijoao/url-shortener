import { inject, injectable } from "tsyringe";
import ILinksRepository from "../../modules/repositories/LinksRepository/ILinksRepository";
import { IGetStatusResponse } from "../../modules/repositories/LinksRepository/dtos/IGetStatusDTO";
import IUsersRepository from "../../modules/repositories/UsersRepository/IUsersRepository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  userId?: string;
}

@injectable()
export default class GetStatus {
  constructor(
    @inject('LinksRepository') private linksRepository: ILinksRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({
    userId
  }: IRequest): Promise<IGetStatusResponse> {
    if (userId) {
      const userExists = await this.usersRepository.findById(userId);
      if (!userExists) {
        throw new AppError('Usuário não existe', 404);
      }
    }
    const reports = await this.linksRepository.getStats({
      userId,
    });
    return reports;
  }
}