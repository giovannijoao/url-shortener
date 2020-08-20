import { Router } from 'express';
import LinksController from '../controllers/LinksController';

const usersRouter = Router();
const linksController = new LinksController();

usersRouter.post('/:userId/urls', linksController.create)

export default usersRouter;