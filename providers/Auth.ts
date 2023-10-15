import { Meta } from "../types/Meta";
import { metaToUserAgent } from "../utils/Meta";
import { Tokens } from "../utils/Tokens";

type LoginResponse = {
  status: "ok" | "error",
  error?: string,
  data?: Tokens,
};

type RefreshResponse = {
  status: "ok" | "error",
  error?: string,
  data?: Tokens,
};

type LogoutResponse = {
  status: "ok" | "error",
  error?: string,
};

export class AuthProvider {
  private service_url: string;
  private user_agent: string;

  constructor(service_url: string, meta: Meta) {
    this.service_url = service_url;
    this.user_agent = metaToUserAgent(meta);
  }

  public async meta(): Promise<any> {

    const response = await fetch(`${this.service_url}/meta`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": this.user_agent,
      },
      // signal: AbortSignal.timeout(10000),
    });

    const response_data = await response.json();

    if (response_data.status !== "ok") {
      throw new Error("Meta error: " + response_data.error);
    }

    return response_data.data;
  }

  public async login(email: string, password: string, remember_me: boolean): Promise<Tokens> {
    const response = await fetch(`${this.service_url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": this.user_agent,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        remember_me: remember_me,
      }),
    });

    const response_data = await response.json() as LoginResponse;

    if (response_data.status !== "ok") {
      throw new Error("Login error: " + response_data.error);
    }

    return response_data.data;
  }

  public async refresh(refresh_token: string): Promise<Tokens> {
    console.log("AuthRepository: Refreshing tokens");

    const response = await fetch(`${this.service_url}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": this.user_agent,
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    const response_data = await response.json() as RefreshResponse;

    if (response_data.status !== "ok") {
      throw new Error("Refresh error: " + response_data.error);
    }

    return response_data.data;
  }

  public async logout(refresh_token: string): Promise<void> {
    const response = await fetch(`${this.service_url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": this.user_agent,
      },
      body: JSON.stringify({
        refresh_token: refresh_token,
      }),
    });

    const response_data = await response.json() as LogoutResponse;
    console.log(response_data);

    if (response_data.status !== "ok") {
      throw new Error("Logout error: " + response_data.error);
    }
  }
}
