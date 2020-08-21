import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateUserService from "../../services/CreateUserService";
import CreateShortLinkService from "../../services/CreateShortLinkService";

interface ICreateLinkResponse {
  id: number;
  url: string;
  hits: number;
  shortUrl: string;
}

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
    const responseBody: ICreateLinkResponse = {
      ...linkInformations,
      shortUrl: `${req.protocol}://${req.get('host')}/urls/${shortId}`
    }
    return res.json(responseBody)
  }
}