import { Request, Response } from "express";
import { container } from "tsyringe";
import GetFullLinkService from "../../services/GetFullLinkService";

export default class LinksController {
  public async show(req: Request, res: Response): Promise<void> {
    const getFullLink = container.resolve(
      GetFullLinkService,
    );
    const { id: shortId } = req.params;
    const link = await getFullLink.execute({
      shortId,
    });
    return res.redirect(link.url);
  }
}