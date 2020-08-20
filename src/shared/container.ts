import { container } from "tsyringe";
import ILinksRepository from "../modules/repositories/LinksRepository/ILinksRepository";
import { MongoDBLinksRepository } from "../modules/repositories/LinksRepository/implementations/MongoDBLinksRepository";


container.registerInstance<ILinksRepository>(
  'LinksRepository',
  container.resolve(MongoDBLinksRepository)
)