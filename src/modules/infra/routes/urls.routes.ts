import { Router } from 'express';
import URLsController from '../controllers/URLsController';

const urlsRouter = Router();
const urlsController = new URLsController();

urlsRouter.get('/:shortId', urlsController.show)
urlsRouter.delete('/:id', urlsController.delete)

export default urlsRouter;