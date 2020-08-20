import { nanoid } from "nanoid";
export default class Link {
  shortId: string;
  id: number;
  hits: number;
  url: string;
  userId: string;

  constructor({
    id,
    hits,
    url,
    userId,
  }: Omit<Link, 'shortId'>) {
    this.id = id;
    this.hits = hits;
    this.url = url;
    this.userId = userId;
    this.shortId = nanoid(8);
  }
}