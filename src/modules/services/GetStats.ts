import { inject, injectable } from "tsyringe";
import ILinksRepository from "../../modules/repositories/LinksRepository/ILinksRepository";
import { IGetStatusResponse } from "../../modules/repositories/LinksRepository/dtos/IGetStatusDTO";

interface IRequest {
  userId?: string;
}

@injectable()
export default class GetStatus {
  constructor(
    @inject('LinksRepository') private linksRepository: ILinksRepository
  ) {}
  async execute({
    userId
  }: IRequest): Promise<IGetStatusResponse> {
    const reports = await this.linksRepository.getStats({
      userId,
    });
    return reports;
  }
}