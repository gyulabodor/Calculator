import { SaveRequest } from "./types";
import { request } from "../request";

export const fetchSave = (body: { result: number }) =>
  request<SaveRequest>({
    endpoint: "save",
    config: {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });