import { ProductDto } from "src/modules/product/DTOs/product.dto";
import { UserDto } from "./user.dto";

export class UserWishListDto {
  user: UserDto;
  products: ProductDto[];
}
