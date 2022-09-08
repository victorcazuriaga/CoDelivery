import { Url } from "url";

interface IProductRequest {
  name: string;
  description: string;
  price: number;
  img_url?: string;
  isAvailable?: boolean;
  category: string;
  restaurant: string;
}

interface IProductResponse {
  name: string;
  description: string;
  price: number;
  img_url: Url;
  is_available: boolean;
  created_at: Date;
  updated_at: Date | null;
  categoryId: string | null;
  restaurantId: string | null;
}
export { IProductRequest, IProductResponse };