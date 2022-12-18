import Product from "./Product";

type Module = {
  id: number;

  serialNumber: string;
  prices: { [currency: string]: number };
  unit: number;
  currencyDisplayed: string;

  createdAt: Date;

  product: Product;
};

export default Module;