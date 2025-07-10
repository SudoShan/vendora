export type ProductCategory = "wearable" | "electronics" | "home" | "other";

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number; // in percentage
  description: string;
  sellername: string;
  image: string[]; // Now an array of image URLs
  category: ProductCategory;
  sizes?: string[]; // Only present if category is "wearable"
}
