import { UserExtended } from "../types/User";
import { ApiClient } from "../utils/Requests";
import { Tokens } from "../utils/Tokens";

type UserResponse = {
  status: "ok" | "error",
  error?: string,
  data?: UserExtended,
};

export class UserProvider {
  private service_url: string;
  private api_client: ApiClient;

  constructor(service_url: string, api_client: ApiClient) {
    this.service_url = service_url;
    this.api_client = api_client;
  }

  public async whoAmI(tokens: Tokens): Promise<UserExtended> {
    const url = `${this.service_url}/who-am-i`;
    const response_data = await this.api_client.makeGetRequest<UserResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("WhoAmI error: " + response_data.error);
    }

    return response_data.data;
  }
}
