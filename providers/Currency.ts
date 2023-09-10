import { Currency } from "../types/Currency";
import { ApiClient } from "../utils/Requests";
import { Tokens } from "../utils/Tokens";

type CurrencyResponse = {
  status: "ok" | "error",
  error: string | null,
  data: Currency | null,
};

export class CurrencyProvider {
  private service_url: string;
  private api_client: ApiClient;

  constructor(service_url: string, api_client: ApiClient) {
    this.service_url = service_url;
    this.api_client = api_client;
  }

  public async getCurrency(tokens: Tokens, code: string): Promise<Currency> {
    const url = `${this.service_url}/currency/?code=${code}`;
    const response_data = await this.api_client.makeGetRequest<CurrencyResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get currency error: " + response_data.error);
    }

    return response_data.data;
  }
}
