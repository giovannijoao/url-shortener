import ICreateLinkDTO from "./dtos/ICreateLinkDTO";
import Link from "./models/Link";

export default interface ILinksRepository {
  create(data: ICreateLinkDTO): Promise<Link>
  findByShortId(shortId: string): Promise<Link | undefined>;
}