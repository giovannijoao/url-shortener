import ICreateLinkDTO from "./dtos/ICreateLinkDTO";
import Link from "./models/Link";
import IGetStatusDTO, { IGetStatusResponse } from "./dtos/IGetStatusDTO";

export default interface ILinksRepository {
  create(data: ICreateLinkDTO): Promise<Link>
  findById(id: number): Promise<Link | undefined>;
  findByShortId(shortId: string): Promise<Link | undefined>;
  save(data: Link): Promise<Link>;
  getStats(data: IGetStatusDTO): Promise<IGetStatusResponse>;
}