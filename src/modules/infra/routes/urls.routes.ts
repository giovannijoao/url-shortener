import { Router } from 'express';
import URLsController from '../controllers/URLsController';

const urlsRouter = Router();
const urlsController = new URLsController();

urlsRouter.get('/:id', urlsController.show)

export default urlsRouter;