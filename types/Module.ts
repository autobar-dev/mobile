export type Module = {
  id: number,
  serial_number: string,
  station_id: string | null,
  product_id: string | null,
  enabled: boolean,
  prices: Map<string, number>,
  created_at: string,
  updated_at: string,
};
