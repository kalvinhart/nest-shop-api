export class UpdateProductDto {
  _id: string;
  name?: string;
  brand?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  inStock?: boolean;
}
