import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateUserService from "../../services/CreateUserService";
import CreateShortLinkService from "../../services/CreateShortLinkService";
import GetStats from "../../services/GetStats";
import DeleteUserService from "../../services/DeleteUserService";

export default class UsersController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const createUser = container.resolve(
      CreateUserService,
    );
    const { id: userId } = req.body;
    const user = await createUser.execute({
      userId
    });
    return res.status(201).json(user)
  }
  public async createShortLink(req: Request, res: Response): Promise<Response> {
    const createShortLink = container.resolve(
      CreateShortLinkService,
    );
    const { userId } = req.params;
    const { url } = req.body;
    const {
      shortId,
      ...linkInformations
    } = await createShortLink.execute({
      url,
      userId
    });
    const responseBody = {
      ...linkInformations,
      shortUrl: `${req.protocol}://${req.get('host')}/urls/${shortId}`
    }
    return res.json(responseBody)
  }
  public async getStats(req: Request, res: Response): Promise<Response> {
    const getStats = container.resolve(
      GetStats,
    );
    const { userId } = req.params;
    const reports = await getStats.execute({
      userId
    });
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
  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteUser = container.resolve(
      DeleteUserService,
    );
    const { userId } = req.params;
    await deleteUser.execute({
      userId,
    });
    return res.status(204).send();
  }
}