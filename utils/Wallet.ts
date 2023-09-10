export function moneyDisplayDecimal(amount: number, minor_unit_divisor: number): string {
  return (amount / minor_unit_divisor).toFixed(Math.log10(minor_unit_divisor));
}
