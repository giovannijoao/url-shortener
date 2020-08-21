import { Router } from 'express';
import StatsController from '../controllers/StatsController';

const statsRouter = Router();
const statsController = new StatsController();

statsRouter.get('/', statsController.index)
statsRouter.get('/:id', statsController.show)

export default statsRouter;