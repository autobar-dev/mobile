import Promo from "./Promo";

type PriceInfo = {
  priceBeforePromos: number;
  price: number;
  currency: string;
  promos: Promo[];
};

export default PriceInfo;