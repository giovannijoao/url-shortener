import ILinksRepository from "../repositories/LinksRepository/ILinksRepository";
import { injectable, inject } from "tsyringe";
import Link from "../repositories/LinksRepository/models/Link";
import IUsersRepository from "../repositories/UsersRepository/IUsersRepository";
import AppError from "../../shared/errors/AppError";

interface IRequest {
  userId: string;
  url: string;
}

@injectable()
export default class CreateShortLinkService {
  constructor (
    @inject('LinksRepository') private linksRepository: ILinksRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({
    url,
    userId
  }: IRequest): Promise<Link> {
    const userExists = await this.usersRepository.findById(userId);
    if (!userExists) {
      throw new AppError('Usuário não existe, cadastre-se primeiro.', 400);
    }
    const link = await this.linksRepository.create({
      url,
      userId,
    });

    return link;
  }
}