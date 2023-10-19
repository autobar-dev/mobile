import { File } from './File';

export type Product = {
  id: string,
  names: Map<string, string>,
  descriptions: Map<string, string>,
  cover: File,
  enabled: boolean,
  created_at: string,
  updated_at: string,
};

export type ProductBadge = {
  type: "primary" | "secondary",
  label: string,
  value?: string,
};
