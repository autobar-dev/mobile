import { Transaction } from "../types/Transaction";
import { Wallet } from "../types/Wallet";
import { ApiClient } from "../utils/Requests";
import { Tokens } from "../utils/Tokens";

type WalletResponse = {
  status: "ok" | "error",
  error?: string,
  data?: Wallet,
};

type AllTransactionsResponse = {
  status: "ok" | "error",
  error?: string,
  data?: Transaction[],
};

export class WalletProvider {
  private service_url: string;
  private api_client: ApiClient;

  constructor(service_url: string, api_client: ApiClient) {
    this.service_url = service_url;
    this.api_client = api_client;
  }

  public async getWallet(tokens: Tokens): Promise<Wallet> {
    const url = `${this.service_url}/wallet/`;
    const response_data = await this.api_client.makeGetRequest<WalletResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get wallet error: " + response_data.error);
    }

    return response_data.data;
  }

  public async getAllTransactions(tokens: Tokens): Promise<Transaction[]> {
    const url = `${this.service_url}/transaction/get-all`;
    const response_data = await this.api_client.makeGetRequest<AllTransactionsResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get all transactions error: " + response_data.error);
    }

    return response_data.data;
  }
}
