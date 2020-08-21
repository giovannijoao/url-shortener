import { Request, Response } from "express";
import { container } from "tsyringe";
import GetStats from "../../services/GetStats";

export default class StatsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const getStats = container.resolve(
      GetStats,
    );
    const reports = await getStats.execute({});
    return res.json(reports);
  }
}