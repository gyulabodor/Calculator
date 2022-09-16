import {request} from "../request"
import { getMemoryResponse } from "./type";

export const fetchMemory = () =>
  request<getMemoryResponse>({
    endpoint: "memory",
    config: {
      method: "GET",
    },
  });