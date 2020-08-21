import { Request, Response } from "express";
import { container } from "tsyringe";
import GetFullLinkService from "../../services/GetFullLinkService";

export default class LinksController {
  public async show(req: Request, res: Response): Promise<Response | void> {
    const getFullLink = container.resolve(
      GetFullLinkService,
    );
    const { id: shortId } = req.params;
    const link = await getFullLink.execute({
      shortId,
    });
    console.log(link);
    if (link) {
      return res.redirect(link.url);
    } else {
      return res.status(404).json({
        message: 'Rota não encontrada'
      })
    }
  }
}