import express from 'express';
import { ServerConfig } from '../configs/server';
const api = express();

const { port: PORT } = ServerConfig;

api.use((req, res, next) => {
  console.log(`[${req.method.toUpperCase()}] ${req.originalUrl}`);
  next();
});

api.get('/', (req, res) => {
  res.send({
    message: 'Hello!'
  })
})

api.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})