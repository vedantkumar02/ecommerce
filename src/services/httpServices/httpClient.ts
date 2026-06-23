import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10_000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.get(endpoint, config);
  }

  async post(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.post(endpoint, data, config);
  }

  async put(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.put(endpoint, data, config);
  }

  async delete(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.client.delete(endpoint, config);
  }

  async patch(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse> {
    return this.client.patch(endpoint, data, config);
  }
}

export const httpClient = new HttpClient();
export default httpClient;
