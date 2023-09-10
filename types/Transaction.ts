export type Transaction = {
  id: string,
  wallet_id: number,
  type: "deposit" | "withdraw" | "purchase" | "refund" | "currency_change",
  value: number,
  currency_code: string,
  created_at: string,
};
