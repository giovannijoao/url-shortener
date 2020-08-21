import ILinksRepository from "../ILinksRepository";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO";
import Link from "../models/Link";
import DatabaseConnection from "../../../../shared/databaseConnection";
import IGetStatusDTO, { IGetStatusResponse } from "../dtos/IGetStatusDTO";

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
    delete link._id;
    return link;
  }

  public async findById(id: number): Promise<Link | undefined> {
    const client = DatabaseConnection.getDb();
    const link = await client.db().collection('links').findOne({
      id,
    })
    delete link._id;
    return link;
  }

  public async save(link: Link): Promise<Link> {
    const client = DatabaseConnection.getDb();
    const saved = await client.db().collection('links').findOneAndUpdate({
      shortId: link.shortId,
    }, {
      $set: link,
    });
    return saved.value;
  }

  public async getStats({
    userId
  }: IGetStatusDTO): Promise<IGetStatusResponse> {
    const client = DatabaseConnection.getDb();
    const collection = client.db().collection('links').aggregate()
    let countsCursor = client.db().collection('links').aggregate();
    if (userId) countsCursor = countsCursor.match({
      userId,
    })
    countsCursor = countsCursor.group<IGetStatusResponse>({
      _id: null,
      hits: {
        $sum: '$hits',
      },
      urlCount: {
        $sum: 1
      },
    }).project({
      hits: '$hits',
      urlCount: '$urlCount',
    });
    const topUrlsCursor = collection.sort({
      hits: -1,
    }).limit(5);
    const [counts, topUrls] = await Promise.all([countsCursor.toArray(), topUrlsCursor.toArray()]);
    const [{ hits, urlCount }] = counts;
    return {
      hits,
      topUrls,
      urlCount,
    }
  }

  public async delete(id: number): Promise<void> {
    const client = DatabaseConnection.getDb();
    client.db().collection('links').remove({
      id,
    })
  }
}