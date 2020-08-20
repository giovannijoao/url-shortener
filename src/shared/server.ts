import "reflect-metadata";
import "./container";
import express from 'express';
import { ServerConfig } from '../configs/server';
import usersRouter from '../modules/infra/routes/users.routes';
const api = express();

const { port: PORT } = ServerConfig;

api.use(express.json());
api.use((req, res, next) => {
  console.log(`[${req.method.toUpperCase()}] ${req.originalUrl}`);
  next();
});


api.get('/', (req, res) => {
  res.send({
    message: 'Hello!'
  })
})

api.use('/users', usersRouter)

api.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})