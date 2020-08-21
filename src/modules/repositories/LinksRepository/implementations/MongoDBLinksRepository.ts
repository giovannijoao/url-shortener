import ILinksRepository from "../ILinksRepository";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO";
import Link from "../models/Link";
import DatabaseConnection from "../../../../shared/databaseConnection";

export class MongoDBLinksRepository implements ILinksRepository {
  public async create({
    url,
    userId,
  }: ICreateLinkDTO): Promise<Link> {
    const client = DatabaseConnection.getDb();
    const collection = client.db().collection('links')
    const lastId = await collection.findOne<Link>({}, {
      sort: {
        id: -1
      }
    });
    const id = lastId ? lastId.id + 1 : 1;
    const link = new Link({
      id,
      hits: 0,
      url,
      userId,
    })
    await collection.insertOne({ ...link })
    return link;
  }

  public async findByShortId(shortId: string): Promise<Link | undefined> {
    const client = DatabaseConnection.getDb();
    const link = await client.db().collection('links').findOne({
      shortId,
    })
    return link;
  }
}