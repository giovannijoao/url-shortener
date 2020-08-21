import { Request, Response } from "express";
import { container } from "tsyringe";
import GetStats from "../../services/GetStats";
import GetStatsByID from "../../services/GetStatsByID";

export default class StatsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const getStats = container.resolve(
      GetStats,
    );
    const reports = await getStats.execute({});
    const response = {
      hits: reports.hits,
      urlCount: reports.urlCount,
      topUrls: reports.topUrls.map(link => ({
        id: link.id,
        hits: link.hits,
        url: link.url,
        shortUrl: `${req.protocol}://${req.get('host')}/urls/${link.shortId}`
      }))
    }
    return res.json(response);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const getStatsByID = container.resolve(
      GetStatsByID,
    );
    const { id } = req.params;
    const link = await getStatsByID.execute({
      id: Number(id)
    });
    return res.json({
      id: link.id,
      hits: link.hits,
      url: link.url,
      shortUrl: `${req.protocol}://${req.get('host')}/urls/${link.shortId}`
    });
  }
}