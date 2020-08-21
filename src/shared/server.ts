import "reflect-metadata";
import "./container";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { ServerConfig } from '../configs/server';
import usersRouter from '../modules/infra/routes/users.routes';
import urlsRouter from "../modules/infra/routes/urls.routes";
import AppError from "./errors/AppError";
import DatabaseConnection from "./databaseConnection";
DatabaseConnection.connect();
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

api.use('/urls', urlsRouter)
api.use('/users', usersRouter)

api.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(36, err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

api.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})