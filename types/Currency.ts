export type Currency = {
  id: number,
  code: string,
  name: string,
  minor_unit_divisor: number,
  symbol: string | null,
  enabled: boolean,
  updated_at: string,
  created_at: string,
};
