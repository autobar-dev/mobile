import { Product } from "../types/Product";
import { ApiClient } from "../utils/Requests";
import { Tokens } from "../utils/Tokens";

type GetProductResponse = {
  status: "ok" | "error",
  error: string | null,
  data: {
    product: Product | null,
    redirect_slug: string | null,
    type: "product" | "redirect",
  } | null,
};

export class ProductProvider {
  private service_url: string;
  private api_client: ApiClient;

  constructor(service_url: string, api_client: ApiClient) {
    this.service_url = service_url;
    this.api_client = api_client;
  }

  public async getProduct(tokens: Tokens, id: string): Promise<Product> {
    const url = `${this.service_url}/?id=${id}`;
    const response_data = await this.api_client.makeGetRequest<GetProductResponse>(url, tokens);

    if (response_data.status !== "ok") {
      console.log(response_data);
      throw new Error("Get product error: " + response_data.error);
    }

    const name_map = new Map<string, string>(Object.entries(response_data.data.product.names));
    const description_map = new Map<string, string>(Object.entries(response_data.data.product.descriptions));

    response_data.data.product.names = name_map;
    response_data.data.product.descriptions = description_map;

    return response_data.data.product;
  }
}
