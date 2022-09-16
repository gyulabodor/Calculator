
import {request} from "../request"
import { PostSaveResultResponse } from "./type";

export const fetchSave = (body: { prevInput : string }) =>
  request<PostSaveResultResponse>({
    endpoint: "save",
    config: {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(body),
    },
  });