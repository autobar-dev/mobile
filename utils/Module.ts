export function getActivationDataFromUrl(url: string): {
  serial_number: string,
  otk: string,
} {
  const base_domain = "https://autobar.ovh";

  const regex = new RegExp(`^${base_domain}/m/([a-zA-Z0-9]+)/([a-zA-Z0-9]+)$`);
  const match = url.match(regex);

  console.log("Activation url", url, match);

  if (match === null || match.length !== 3) {
    throw new Error("Invalid activation url");
  }

  return {
    serial_number: match[1],
    otk: match[2],
  };
}

