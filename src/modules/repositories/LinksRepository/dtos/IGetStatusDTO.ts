import Link from "../models/Link";

export default interface IGetStatusDTO {
  userId?: string;
}

export interface IGetStatusResponse {
  hits: number;
  urlCount: number;
  topUrls: Link[];
}