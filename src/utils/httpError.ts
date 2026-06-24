import axios from "axios";

export const API_MAINTENANCE_MESSAGE =
  "We are under maintenance. We'll be right back.";

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404;
}
