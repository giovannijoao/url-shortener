import IUsersRepository from "../IUsersRepository";
import DatabaseConnection from "../../../../shared/databaseConnection";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from "../models/User";

export class MongoDBUsersRepository implements IUsersRepository {
  public async create({
    id,
  }: ICreateUserDTO): Promise<User> {
    const client = DatabaseConnection.getDb();
    const collection = client.db().collection('users')
    const user = new User(id)
    await collection.insertOne({...user})
    return user;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const client = DatabaseConnection.getDb();
    const link = await client.db().collection('users').findOne({
      id: userId,
    })
    return link;
  }

  public async delete(userId: String): Promise<void> {
    const client = DatabaseConnection.getDb();
    await client.db().collection('users').remove({
      id: userId,
    })
  }
}