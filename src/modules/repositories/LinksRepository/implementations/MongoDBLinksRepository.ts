import { MongoClient, connect } from "mongodb";
import ILinksRepository from "../ILinksRepository";
import ICreateLinkDTO from "../dtos/ICreateLinkDTO";
import Link from "../models/Link";

export class MongoDBLinksRepository implements ILinksRepository {
  private client: MongoClient;
  constructor() {
    connect(`mongodb://localhost:27017/urlShortener`).then(client => {
      console.log('Connected to database');
      this.client = client;
    }).catch(() => {
      console.error(`Error at trying to connect the database`)
    })
  }

  public async create({
    url,
    userId,
  }: ICreateLinkDTO): Promise<Link> {
    const collection = this.client.db().collection('links')
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
}