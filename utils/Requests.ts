import { AuthProvider } from "../providers/Auth";
import { Meta } from "../types/Meta";
import { metaToUserAgent } from "./Meta";
import { Tokens } from "./Tokens";

export class ApiClient {
  private auth_provider: AuthProvider;
  private user_agent: string;
  private set_tokens: (tokens: Tokens | undefined) => void;

  constructor(auth_provider: AuthProvider, meta: Meta, set_tokens: (tokens: Tokens | undefined) => void) {
    this.auth_provider = auth_provider;
    this.user_agent = metaToUserAgent(meta);
    this.set_tokens = set_tokens;
  }

  async makeGetRequest<T>(url: string, tokens: Tokens, is_retry: boolean = false): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": this.user_agent,
          "Authorization": `Bearer ${tokens.access_token}`
        },
      });

      return await response.json() as T;
    } catch (error) {
      if (is_retry) {
        throw new Error("Retry failed. Error: " + error);
      }

      const new_tokens = await this.auth_provider.refresh(tokens.refresh_token);
      this.set_tokens(new_tokens);

      this.makeGetRequest(url, new_tokens, true); // retry request
    }
  }
}
