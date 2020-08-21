import { container } from "tsyringe";
import ILinksRepository from "../modules/repositories/LinksRepository/ILinksRepository";
import IUsersRepository from "../modules/repositories/UsersRepository/IUsersRepository";
import { MongoDBLinksRepository } from "../modules/repositories/LinksRepository/implementations/MongoDBLinksRepository";
import { MongoDBUsersRepository } from "../modules/repositories/UsersRepository/implentations/MongoDBUsersRepository";


container.registerSingleton<ILinksRepository>(
  'LinksRepository',
  MongoDBLinksRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  MongoDBUsersRepository
)