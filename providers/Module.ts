import { ActivationSession } from "../types/ActivationSession";
import { Module } from "../types/Module";
import { ApiClient } from "../utils/Requests";
import { Tokens } from "../utils/Tokens";

type GetModuleResponse = {
  status: "ok" | "error",
  error: string | null,
  data: Module | null,
};

type ActivateResponse = {
  status: "ok" | "error",
  error: string | null,
};

type DeactivateResponse = {
  status: "ok" | "error",
  error: string | null,
};

type GetActivationSessionResponse = {
  status: "ok" | "error",
  error: string | null,
  data: ActivationSession | null,
};

export class ModuleProvider {
  private service_url: string;
  private api_client: ApiClient;

  constructor(service_url: string, api_client: ApiClient) {
    this.service_url = service_url;
    this.api_client = api_client;
  }

  public async getModule(tokens: Tokens, serial_number: string): Promise<Module> {
    const url = `${this.service_url}/?serial_number=${serial_number}`;
    const response_data = await this.api_client.makeGetRequest<GetModuleResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get module error: " + response_data.error);
    }

    return response_data.data;
  }

  public async getActivationSession(tokens: Tokens): Promise<ActivationSession> {
    const url = `${this.service_url}/activation-session`;
    const response_data = await this.api_client.makeGetRequest<GetActivationSessionResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get module error: " + response_data.error);
    }

    return response_data.data;
  }

  public async activate(tokens: Tokens, serial_number: string, otk: string): Promise<void> {
    const url = `${this.service_url}/activate`;
    const response_data = await this.api_client.makePostRequest<ActivateResponse>(url, {
      serial_number,
      otk,
    }, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Activate error: " + response_data.error);
    }
  }

  public async deactivate(tokens: Tokens): Promise<void> {
    const url = `${this.service_url}/deactivate`;
    const response_data = await this.api_client.makePostRequest<DeactivateResponse>(url, {}, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Deactivate error: " + response_data.error);
    }
  }
}
