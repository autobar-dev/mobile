export class ImageProvider {
  private service_url: string;

  constructor(service_url: string) {
    this.service_url = service_url;
  }

  public resize(
    url: string,
    width: number,
    height: number,
  ): string {
    const encoded = encodeURIComponent(url);
    return `${this.service_url}/resize?width=${width}&height=${height}&url=${encoded}`;
  }
}
