import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateShortLinkService from "../../services/CreateShortLinkService";

interface ICreateLinkResponse {
  id: number;
  url: string;
  hits: number;
  shortUrl: string;
}

export default class LinksController {
  public async create(req: Request, res: Response): Promise<Response> {
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