import { connect, MongoClient } from "mongodb";

let cachedClient: MongoClient;
const DatabaseConnection = {
  connect() {
    connect(`mongodb://localhost:27017/urlShortener`).then(client => {
      console.log('Connected to database');
      cachedClient = client;
    }).catch(() => {
      console.error(`Error at trying to connect the database`)
    })
  },
  getDb() {
    return cachedClient;
  }
}

export default DatabaseConnection;