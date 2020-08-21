import { Request, Response } from "express";
import { container } from "tsyringe";
import GetFullLinkService from "../../services/GetFullLinkService";
import DeleteShortLink from "../../services/DeleteShortLink";

export default class URLsController {
  public async show(req: Request, res: Response): Promise<void> {
    const getFullLink = container.resolve(
      GetFullLinkService,
    );
    const { shortId } = req.params;
    const link = await getFullLink.execute({
      shortId,
    });
    return res.redirect(link.url);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const deleteShortLink = container.resolve(
      DeleteShortLink,
    );
    const { id } = req.params;
    await deleteShortLink.execute({
      id: Number(id),
    });
    return res.status(204).send();
  }
}