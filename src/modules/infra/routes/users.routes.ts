import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();
usersRouter.post('/', usersController.createUser)
usersRouter.post('/:userId/urls', usersController.createShortLink)
usersRouter.get('/:userId/stats', usersController.getStats)

export default usersRouter;